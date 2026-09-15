// Cloudflare Worker for garberlab-website.
//
// Static pages are served straight from ./out by Workers Static Assets. This script
// only runs for the paths listed in `assets.run_worker_first` (wrangler.jsonc):
//   /_t        engagement beacon from components/analytics.tsx, stored in D1
//   /admin     password-protected engagement dashboard and its JSON API

import adminHtml from "./admin.html";
import {
  adminFilters,
  clientAddress,
  isAllowedSource,
  isBot,
  parseBasicAuth,
  parseEvent,
  referrerHost,
  registrableDomain,
  reverseName,
  secretsMatch,
  type TrackEvent,
} from "./lib.ts";

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  ADMIN_USER?: string;
  ADMIN_PASSWORD?: string;
  /** Local development only: "1" skips the password when the request host is localhost. */
  ADMIN_OPEN_LOCALHOST?: string;
}

const DAY_MS = 86_400_000;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_t") {
      return ingest(request, url, env, ctx);
    }
    if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
      return admin(request, url, env);
    }
    return env.ASSETS.fetch(request);
  },

  // Daily retention: raw events for 400 days, visitor IPs for 90 days.
  async scheduled(_controller: ScheduledController, env: Env): Promise<void> {
    const now = Date.now();
    await env.DB.batch([
      env.DB.prepare("DELETE FROM events WHERE ts < ?").bind(now - 400 * DAY_MS),
      env.DB.prepare("DELETE FROM sessions WHERE last_ts < ?").bind(now - 400 * DAY_MS),
      env.DB.prepare("UPDATE sessions SET ip = NULL WHERE first_ts < ? AND ip IS NOT NULL").bind(now - 90 * DAY_MS),
      env.DB.prepare("DELETE FROM ip_info WHERE looked_up_at < ?").bind(now - 30 * DAY_MS),
    ]);
  },
} satisfies ExportedHandler<Env>;

// ---------------------------------------------------------------------------
// Ingest

async function ingest(request: Request, url: URL, env: Env, ctx: ExecutionContext): Promise<Response> {
  const noContent = new Response(null, { status: 204, headers: { "cache-control": "no-store" } });

  let params = url.searchParams;
  if (request.method === "POST") {
    const body = await request.text();
    if (body.length > 4096) return noContent;
    params = new URLSearchParams(body);
  } else if (request.method !== "GET") {
    return new Response(null, { status: 405 });
  }

  const event = parseEvent(params);
  const headers = request.headers;
  if (!event || !isAllowedSource(headers.get("origin"), headers.get("referer"))) {
    // Same response either way, so probing the endpoint teaches nothing.
    return noContent;
  }

  ctx.waitUntil(
    record(request, event, env).catch((error) => console.error("analytics ingest failed", error)),
  );
  return noContent;
}

async function record(request: Request, event: TrackEvent, env: Env): Promise<void> {
  const headers = request.headers;
  const { ip, viaProxy } = clientAddress(headers);
  // Through the proxy, request.cf describes the UMass server, not the visitor.
  const cf = viaProxy ? undefined : request.cf;
  const userAgent = headers.get("user-agent")?.slice(0, 300) ?? null;
  const bot = isBot(userAgent, headers.get("accept-language")) ? 1 : 0;
  const now = Date.now();

  const scroll = event.event === "scroll" ? (event.value ?? 0) : 0;
  const dwell = event.event === "dwell" || event.event === "exit" ? (event.value ?? 0) : 0;

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO sessions (sid, first_ts, last_ts, host, ip, via_proxy, asn, as_org, country, region, city, tz,
         ua, lang, referrer, referrer_host, landing_page, utm_source, utm_medium, utm_campaign, ref, is_bot,
         max_scroll, max_dwell)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(sid) DO UPDATE SET
         last_ts = excluded.last_ts,
         max_scroll = MAX(sessions.max_scroll, excluded.max_scroll),
         max_dwell = MAX(sessions.max_dwell, excluded.max_dwell),
         is_bot = MAX(sessions.is_bot, excluded.is_bot),
         lang = COALESCE(sessions.lang, excluded.lang),
         tz = COALESCE(sessions.tz, excluded.tz),
         referrer = COALESCE(sessions.referrer, excluded.referrer),
         referrer_host = COALESCE(sessions.referrer_host, excluded.referrer_host),
         utm_source = COALESCE(sessions.utm_source, excluded.utm_source),
         utm_medium = COALESCE(sessions.utm_medium, excluded.utm_medium),
         utm_campaign = COALESCE(sessions.utm_campaign, excluded.utm_campaign),
         ref = COALESCE(sessions.ref, excluded.ref)`,
    ).bind(
      event.sid,
      now,
      now,
      event.host,
      ip,
      viaProxy ? 1 : 0,
      typeof cf?.asn === "number" ? cf.asn : null,
      (cf?.asOrganization as string | undefined) ?? null,
      (cf?.country as string | undefined) ?? null,
      (cf?.region as string | undefined) ?? null,
      (cf?.city as string | undefined) ?? null,
      event.tz ?? (cf?.timezone as string | undefined) ?? null,
      userAgent,
      event.lang,
      event.referrer,
      referrerHost(event.referrer),
      event.page,
      event.utmSource,
      event.utmMedium,
      event.utmCampaign,
      event.ref,
      bot,
      scroll,
      dwell,
    ),
    env.DB.prepare(
      "INSERT INTO events (ts, sid, page, event, label, detail, value) VALUES (?, ?, ?, ?, ?, ?, ?)",
    ).bind(now, event.sid, event.page, event.event, event.label, event.detail, event.value),
  ]);

  if (event.event === "open" && ip && !bot) {
    await attachReverseDns(env, event.sid, ip);
  }
}

/** Looks up the visitor's PTR record once per IP (cached in ip_info) and copies it onto the session. */
async function attachReverseDns(env: Env, sid: string, ip: string): Promise<void> {
  let rdns: string | null;
  const cached = await env.DB.prepare("SELECT rdns FROM ip_info WHERE ip = ?").bind(ip).first<{ rdns: string | null }>();

  if (cached) {
    rdns = cached.rdns;
  } else {
    rdns = await lookupPtr(ip);
    await env.DB.prepare("INSERT OR REPLACE INTO ip_info (ip, rdns, looked_up_at) VALUES (?, ?, ?)")
      .bind(ip, rdns, Date.now())
      .run();
  }
  if (!rdns) return;

  await env.DB.prepare("UPDATE sessions SET rdns = ?, rdns_domain = ? WHERE sid = ? AND rdns IS NULL")
    .bind(rdns, registrableDomain(rdns), sid)
    .run();
}

async function lookupPtr(ip: string): Promise<string | null> {
  const name = reverseName(ip);
  if (!name) return null;
  try {
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${name}&type=PTR`, {
      headers: { accept: "application/dns-json" },
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return null;
    const answer = (await response.json()) as { Answer?: { type: number; data: string }[] };
    const ptr = answer.Answer?.find((record) => record.type === 12)?.data;
    return ptr ? ptr.replace(/\.$/, "").slice(0, 200) : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Admin

const ADMIN_HEADERS = {
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow",
  "x-frame-options": "DENY",
  "referrer-policy": "no-referrer",
};

async function admin(request: Request, url: URL, env: Env): Promise<Response> {
  const denied = await authorize(request, url, env);
  if (denied) return denied;

  if (url.pathname === "/admin" || url.pathname === "/admin/") {
    return new Response(adminHtml, {
      headers: {
        ...ADMIN_HEADERS,
        "content-type": "text/html; charset=utf-8",
        "content-security-policy":
          "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src data:; base-uri 'none'; form-action 'none'",
      },
    });
  }

  const handler = API[url.pathname.replace(/^\/admin\/api\//, "")];
  if (!url.pathname.startsWith("/admin/api/") || !handler) {
    return new Response("Not found", { status: 404, headers: ADMIN_HEADERS });
  }

  try {
    const body = await handler(env.DB, url);
    return Response.json(body, { headers: ADMIN_HEADERS });
  } catch (error) {
    console.error("admin query failed", url.pathname, error);
    return Response.json({ error: "query failed" }, { status: 500, headers: ADMIN_HEADERS });
  }
}

async function authorize(request: Request, url: URL, env: Env): Promise<Response | null> {
  if (env.ADMIN_OPEN_LOCALHOST === "1" && url.hostname === "localhost") return null;

  if (!env.ADMIN_USER || !env.ADMIN_PASSWORD) {
    return new Response("Admin is not configured. Set the ADMIN_USER and ADMIN_PASSWORD secrets.", {
      status: 503,
      headers: ADMIN_HEADERS,
    });
  }

  const credentials = parseBasicAuth(request.headers.get("authorization"));
  const [userOk, passwordOk] = await Promise.all([
    secretsMatch(credentials?.user ?? "", env.ADMIN_USER),
    secretsMatch(credentials?.password ?? "", env.ADMIN_PASSWORD),
  ]);
  if (credentials && userOk && passwordOk) return null;

  return new Response("Authentication required", {
    status: 401,
    headers: { ...ADMIN_HEADERS, "www-authenticate": 'Basic realm="Garber Lab engagement", charset="UTF-8"' },
  });
}

type Filters = ReturnType<typeof adminFilters>;

const ORG = "COALESCE(s.as_org, s.rdns_domain, 'Unknown')";

// Lab members and campus traffic, hidden with the "Hide UMass" toggle.
const UMASS = `(COALESCE(s.as_org, '') LIKE '%umass%'
  OR COALESCE(s.as_org, '') LIKE '%university of massachusetts%'
  OR COALESCE(s.rdns_domain, '') IN ('umassmed.edu', 'umass.edu'))`;

/** Shared session filter. Every query aliases sessions as `s`. */
function sessionFilter(filters: Filters): { sql: string; binds: number[] } {
  return {
    sql: `s.first_ts >= ? AND (? = 1 OR s.is_bot = 0) AND (? = 0 OR NOT ${UMASS})`,
    binds: [filters.since, filters.bots ? 1 : 0, filters.hideUmass ? 1 : 0],
  };
}

async function all<T = Record<string, unknown>>(db: D1Database, sql: string, binds: unknown[]): Promise<T[]> {
  const { results } = await db.prepare(sql).bind(...binds).all<T>();
  return results;
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

const API: Record<string, (db: D1Database, url: URL) => Promise<unknown>> = {
  async overview(db, url) {
    const filters = adminFilters(url);
    const where = sessionFilter(filters);

    const [totals, pageviews, daily, dwell, landing, countries] = await Promise.all([
      all(
        db,
        `SELECT COUNT(*) AS sessions, COUNT(DISTINCT s.ip) AS ips,
                COUNT(DISTINCT COALESCE(s.as_org, s.rdns_domain)) AS orgs,
                COALESCE(SUM(CASE WHEN s.max_dwell >= 30 THEN 1 ELSE 0 END), 0) AS engaged
         FROM sessions s WHERE ${where.sql}`,
        where.binds,
      ),
      all(
        db,
        `SELECT COUNT(*) AS pageviews FROM events e JOIN sessions s ON s.sid = e.sid
         WHERE e.event = 'open' AND ${where.sql}`,
        where.binds,
      ),
      all(
        db,
        `SELECT date(s.first_ts / 1000 - ? * 60, 'unixepoch') AS day, COUNT(*) AS sessions,
                COUNT(DISTINCT COALESCE(s.as_org, s.rdns_domain)) AS orgs
         FROM sessions s WHERE ${where.sql} GROUP BY day ORDER BY day`,
        [filters.tzOffset, ...where.binds],
      ),
      all<{ max_dwell: number }>(db, `SELECT s.max_dwell FROM sessions s WHERE ${where.sql}`, where.binds),
      all(
        db,
        `SELECT s.landing_page AS page, COUNT(*) AS sessions FROM sessions s WHERE ${where.sql}
         GROUP BY s.landing_page ORDER BY sessions DESC LIMIT 10`,
        where.binds,
      ),
      all(
        db,
        `SELECT COALESCE(s.country, '??') AS country, COUNT(*) AS sessions FROM sessions s WHERE ${where.sql}
         GROUP BY country ORDER BY sessions DESC LIMIT 10`,
        where.binds,
      ),
    ]);

    return {
      totals: { ...totals[0], ...pageviews[0], medianDwell: median(dwell.map((row) => row.max_dwell)) },
      daily,
      landing,
      countries,
    };
  },

  async orgs(db, url) {
    const filters = adminFilters(url);
    const where = sessionFilter(filters);

    const [orgs, pages] = await Promise.all([
      all(
        db,
        `SELECT ${ORG} AS org, MAX(s.asn) AS asn, GROUP_CONCAT(DISTINCT s.rdns_domain) AS domains,
                COUNT(*) AS sessions, COUNT(DISTINCT s.ip) AS ips, MAX(s.last_ts) AS last_ts,
                GROUP_CONCAT(DISTINCT (s.city || ', ' || s.country)) AS places,
                SUM(s.max_dwell) AS dwell, SUM(COALESCE(pv.n, 0)) AS pageviews
         FROM sessions s
         LEFT JOIN (SELECT sid, COUNT(*) AS n FROM events WHERE event = 'open' AND ts >= ? GROUP BY sid) pv
           ON pv.sid = s.sid
         WHERE ${where.sql}
         GROUP BY org ORDER BY sessions DESC, last_ts DESC LIMIT 500`,
        [filters.since, ...where.binds],
      ),
      all<{ org: string; page: string; views: number }>(
        db,
        `SELECT ${ORG} AS org, e.page, COUNT(*) AS views
         FROM events e JOIN sessions s ON s.sid = e.sid
         WHERE e.event = 'open' AND ${where.sql}
         GROUP BY org, e.page ORDER BY views DESC`,
        where.binds,
      ),
    ]);

    const pagesByOrg = new Map<string, string[]>();
    for (const row of pages) {
      const list = pagesByOrg.get(row.org) ?? [];
      list.push(`${row.page} (${row.views})`);
      pagesByOrg.set(row.org, list);
    }
    return { orgs: orgs.map((row) => ({ ...row, pages: (pagesByOrg.get(row.org as string) ?? []).join(", ") })) };
  },

  async sessions(db, url) {
    const filters = adminFilters(url);
    const where = sessionFilter(filters);
    const org = url.searchParams.get("org");

    const sessions = await all(
      db,
      `SELECT s.sid, s.first_ts, s.last_ts, ${ORG} AS org, s.asn, s.rdns, s.ip, s.via_proxy, s.city, s.region,
              s.country, s.tz, s.lang, s.ua, s.referrer_host, s.landing_page, s.utm_source, s.utm_medium,
              s.utm_campaign, s.ref, s.is_bot, s.max_scroll, s.max_dwell,
              (SELECT GROUP_CONCAT(e.page, ' > ' ORDER BY e.id) FROM events e
                 WHERE e.sid = s.sid AND e.event = 'open') AS pages,
              (SELECT GROUP_CONCAT(DISTINCT e.label) FROM events e
                 WHERE e.sid = s.sid AND e.event = 'view') AS sections,
              (SELECT GROUP_CONCAT(e.label, ' | ' ORDER BY e.id) FROM events e
                 WHERE e.sid = s.sid AND e.event = 'click') AS clicks
       FROM sessions s
       WHERE ${where.sql} ${org ? `AND ${ORG} = ?` : ""}
       ORDER BY s.first_ts DESC LIMIT 500`,
      org ? [...where.binds, org] : where.binds,
    );
    return { sessions };
  },

  async content(db, url) {
    const filters = adminFilters(url);
    const where = sessionFilter(filters);

    const [pages, time, sections, clicks] = await Promise.all([
      all(
        db,
        `SELECT e.page, COUNT(*) AS opens, COUNT(DISTINCT e.sid) AS sessions
         FROM events e JOIN sessions s ON s.sid = e.sid
         WHERE e.event = 'open' AND ${where.sql}
         GROUP BY e.page ORDER BY opens DESC`,
        where.binds,
      ),
      all(
        db,
        `SELECT page, ROUND(AVG(seconds)) AS avg_seconds, ROUND(AVG(scroll)) AS avg_scroll FROM (
           SELECT e.page, e.sid,
                  MAX(CASE WHEN e.event IN ('dwell', 'exit') THEN e.value END) AS seconds,
                  MAX(CASE WHEN e.event = 'scroll' THEN e.value END) AS scroll
           FROM events e JOIN sessions s ON s.sid = e.sid
           WHERE e.event IN ('dwell', 'exit', 'scroll') AND ${where.sql}
           GROUP BY e.page, e.sid)
         GROUP BY page`,
        where.binds,
      ),
      all(
        db,
        `SELECT e.page, e.label AS section, COUNT(*) AS views, COUNT(DISTINCT e.sid) AS sessions
         FROM events e JOIN sessions s ON s.sid = e.sid
         WHERE e.event = 'view' AND ${where.sql}
         GROUP BY e.page, e.label ORDER BY e.page, views DESC`,
        where.binds,
      ),
      all(
        db,
        `SELECT e.label AS target, MAX(e.detail) AS text, COUNT(*) AS clicks, COUNT(DISTINCT e.sid) AS sessions,
                GROUP_CONCAT(DISTINCT e.page) AS pages
         FROM events e JOIN sessions s ON s.sid = e.sid
         WHERE e.event = 'click' AND ${where.sql}
         GROUP BY e.label ORDER BY clicks DESC LIMIT 200`,
        where.binds,
      ),
    ]);

    const opensByPage = new Map(pages.map((row) => [row.page as string, row.opens as number]));
    return {
      pages,
      time,
      sections: sections.map((row) => ({
        ...row,
        reach: Math.round((100 * (row.views as number)) / Math.max(1, opensByPage.get(row.page as string) ?? 0)),
      })),
      clicks,
    };
  },

  async referrers(db, url) {
    const filters = adminFilters(url);
    const where = sessionFilter(filters);

    const [hosts, campaigns] = await Promise.all([
      all(
        db,
        `SELECT COALESCE(s.referrer_host, '(direct or hidden)') AS source, COUNT(*) AS sessions,
                COUNT(DISTINCT COALESCE(s.as_org, s.rdns_domain)) AS orgs, ROUND(AVG(s.max_dwell)) AS avg_dwell
         FROM sessions s WHERE ${where.sql}
         GROUP BY source ORDER BY sessions DESC LIMIT 200`,
        where.binds,
      ),
      all(
        db,
        `SELECT s.utm_source, s.utm_medium, s.utm_campaign, s.ref, COUNT(*) AS sessions, MAX(s.last_ts) AS last_ts
         FROM sessions s
         WHERE ${where.sql} AND (s.utm_source IS NOT NULL OR s.utm_campaign IS NOT NULL OR s.ref IS NOT NULL)
         GROUP BY s.utm_source, s.utm_medium, s.utm_campaign, s.ref ORDER BY sessions DESC LIMIT 200`,
        where.binds,
      ),
    ]);
    return { hosts, campaigns };
  },
};
