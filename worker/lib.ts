// Pure helpers for the analytics Worker. No Cloudflare APIs here, so
// `node --test` can exercise them directly (see lib.test.ts).

export const PUBLIC_HOST = "garberlab.umassmed.edu";
export const WORKER_HOST = "garberlab-website.manuel-garber.workers.dev";

export const EVENT_TYPES = ["open", "scroll", "dwell", "view", "click", "exit"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export type TrackEvent = {
  sid: string;
  page: string;
  event: EventType;
  label: string | null;
  detail: string | null;
  value: number | null;
  host: string | null;
  // Sent with "open" events only; kept from the first event of the session.
  referrer: string | null;
  lang: string | null;
  tz: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  ref: string | null;
};

function text(params: URLSearchParams, key: string, max: number): string | null {
  const raw = params.get(key);
  if (raw === null) return null;
  // Strip control characters so nothing odd reaches the admin tables or CSV export.
  const cleaned = raw.replace(/[\x00-\x1f\x7f]/g, " ").trim();
  return cleaned ? cleaned.slice(0, max) : null;
}

/** Validates beacon parameters. Returns null for anything that is not a well-formed event. */
export function parseEvent(params: URLSearchParams): TrackEvent | null {
  const event = params.get("e");
  if (!event || !(EVENT_TYPES as readonly string[]).includes(event)) return null;

  const sid = params.get("s");
  if (!sid || !/^[a-z0-9]{8,32}$/.test(sid)) return null;

  const page = params.get("p");
  if (!page || !page.startsWith("/") || page.length > 200) return null;

  let value: number | null = null;
  const rawValue = params.get("n");
  if (rawValue !== null) {
    if (!/^\d{1,6}$/.test(rawValue)) return null;
    value = Math.min(Number(rawValue), 86400);
  }
  if ((event === "scroll" || event === "dwell" || event === "exit") && value === null) return null;
  if (event === "scroll" && value !== null) value = Math.min(value, 100);

  const label = text(params, "l", 160);
  if ((event === "view" || event === "click") && !label) return null;

  return {
    sid,
    page,
    event: event as EventType,
    label,
    detail: text(params, "d", 120),
    value,
    host: text(params, "h", 80),
    referrer: text(params, "r", 400),
    lang: text(params, "lg", 40),
    tz: text(params, "tz", 60),
    utmSource: text(params, "us", 80),
    utmMedium: text(params, "um", 80),
    utmCampaign: text(params, "uc", 120),
    ref: text(params, "ref", 80),
  };
}

function hostOf(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Beacons must come from pages on the lab site. Image requests carry a Referer
 * (origin only, cross-site) and sendBeacon carries an Origin.
 */
export function isAllowedSource(origin: string | null, referer: string | null): boolean {
  const host = hostOf(origin) ?? hostOf(referer);
  if (!host) return false;
  return host === PUBLIC_HOST || host === WORKER_HOST || host === "localhost" || host === "127.0.0.1";
}

export function referrerHost(referrer: string | null): string | null {
  const host = hostOf(referrer);
  if (!host || host === PUBLIC_HOST || host === WORKER_HOST) return null;
  return host.replace(/^www\./, "");
}

const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|preview|python|curl|wget|httpclient|scrapy|phantom|puppeteer|playwright/i;

export function isBot(userAgent: string | null, acceptLanguage: string | null): boolean {
  if (!userAgent) return true;
  return BOT_UA.test(userAgent) || !acceptLanguage;
}

export type ClientAddress = { ip: string | null; viaProxy: boolean };

/**
 * The tracker posts straight to workers.dev, so CF-Connecting-IP is the visitor.
 * If a beacon arrives through the UMass Apache proxy instead, CF-Connecting-IP is
 * the proxy, and the visitor is the first X-Forwarded-For entry.
 */
export function clientAddress(headers: Headers): ClientAddress {
  const forwardedHost = headers.get("x-forwarded-host");
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedHost === PUBLIC_HOST && forwardedFor) {
    const first = forwardedFor.split(",")[0].trim();
    return { ip: first || null, viaProxy: true };
  }
  return { ip: headers.get("cf-connecting-ip"), viaProxy: false };
}

/** DNS name to query for a PTR record, or null if the address does not parse. */
export function reverseName(ip: string): string | null {
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) {
    const parts = ip.split(".");
    if (parts.some((part) => Number(part) > 255)) return null;
    return `${parts.reverse().join(".")}.in-addr.arpa`;
  }
  if (!ip.includes(":") || !/^[0-9a-f:]+$/i.test(ip)) return null;
  const halves = ip.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (missing < 0 || (halves.length === 1 && missing !== 0)) return null;
  const groups = [...head, ...Array(missing).fill("0"), ...tail];
  if (groups.some((group) => group.length > 4)) return null;
  const nibbles = groups.map((group) => group.padStart(4, "0")).join("").toLowerCase();
  return `${nibbles.split("").reverse().join(".")}.ip6.arpa`;
}

// Second-level labels that sit under a country code, e.g. ox.ac.uk, unimelb.edu.au.
const COUNTRY_SLDS = new Set(["ac", "co", "com", "edu", "gov", "net", "org", "go", "or", "ne"]);

/** Registrable domain from a PTR hostname: "dhcp-10-2.med.harvard.edu." gives "harvard.edu". */
export function registrableDomain(hostname: string | null): string | null {
  if (!hostname) return null;
  const labels = hostname.toLowerCase().replace(/\.$/, "").split(".").filter(Boolean);
  if (labels.length < 2) return null;
  const tld = labels[labels.length - 1];
  const sld = labels[labels.length - 2];
  const take = tld.length === 2 && COUNTRY_SLDS.has(sld) && labels.length >= 3 ? 3 : 2;
  return labels.slice(-take).join(".");
}

/** Label used to group visitors by organization in the admin view. */
export function orgLabel(asOrg: string | null, rdnsDomain: string | null): string {
  return asOrg || rdnsDomain || "Unknown";
}

/** Constant-time string comparison via SHA-256 digests (equal length by construction). */
export async function secretsMatch(given: string, expected: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(given)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  const left = new Uint8Array(a);
  const right = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < left.length; i++) diff |= left[i] ^ right[i];
  return diff === 0;
}

export function parseBasicAuth(header: string | null): { user: string; password: string } | null {
  if (!header || !header.startsWith("Basic ")) return null;
  let decoded: string;
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return null;
  }
  const colon = decoded.indexOf(":");
  if (colon < 0) return null;
  return { user: decoded.slice(0, colon), password: decoded.slice(colon + 1) };
}

/** Admin query filters from the URL, with safe defaults. */
export function adminFilters(url: URL): { since: number; bots: boolean; hideUmass: boolean; tzOffset: number } {
  const days = Number(url.searchParams.get("days"));
  const window = [1, 7, 30, 90, 365].includes(days) ? days : 30;
  const tzo = Number(url.searchParams.get("tzo"));
  return {
    since: Date.now() - window * 86_400_000,
    bots: url.searchParams.get("bots") === "1",
    hideUmass: url.searchParams.get("hideUmass") === "1",
    tzOffset: Number.isInteger(tzo) && Math.abs(tzo) <= 840 ? tzo : 0,
  };
}
