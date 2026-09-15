"use client";

// Engagement tracking for the /admin dashboard (see worker/index.ts).
//
// Records page opens, scroll depth, visible time, which sections were read, and
// clicks on publications, resources and outbound links. No cookies and no device
// fingerprinting: a random id in sessionStorage groups one browser tab's events.
// It is a component rather than a plain script because next/link navigates on the
// client, so a page-load script would only ever see the landing page.

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { siteUrl, trackEndpoint } from "../data/site";

const SCROLL_MARKS = [25, 50, 75, 100];
const DWELL_MARKS = [10, 30, 60, 120, 300];
const SECTION_SELECTOR = "main section, main article.core-chapter, main article.resource-item, [data-track]";

type Params = Record<string, string | number | undefined | null>;

let firstOpenSent = false;

function enabled(): boolean {
  if (typeof window === "undefined") return false;
  if (navigator.doNotTrack === "1") return false;
  const local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (!local) return true;
  // Local opt-in with ?track=1, remembered for the tab because client navigation drops the query string.
  try {
    if (new URLSearchParams(location.search).has("track")) sessionStorage.setItem("gl_track", "1");
    return sessionStorage.getItem("gl_track") === "1";
  } catch {
    return false;
  }
}

function endpoint(): string {
  // On localhost (`wrangler dev`) and on workers.dev branch previews, post to the Worker
  // serving the page, so a preview build is tested against its own code.
  const host = location.hostname;
  const sameOrigin = host === "localhost" || host === "127.0.0.1" || host.endsWith(".workers.dev");
  return sameOrigin ? "/_t" : trackEndpoint;
}

function sessionId(): string {
  try {
    let sid = sessionStorage.getItem("gl_sid");
    if (!sid) {
      sid = Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) => b.toString(16).padStart(2, "0")).join("");
      sessionStorage.setItem("gl_sid", sid);
    }
    return sid;
  } catch {
    return Math.random().toString(36).slice(2, 14).padEnd(12, "0");
  }
}

function encode(page: string, event: string, extra: Params): string {
  const params = new URLSearchParams({ e: event, p: page, s: sessionId(), h: location.hostname });
  for (const [key, value] of Object.entries(extra)) {
    if (value !== undefined && value !== null && value !== "") params.set(key, String(value));
  }
  return params.toString();
}

function send(page: string, event: string, extra: Params = {}): void {
  const image = new Image(1, 1);
  image.src = `${endpoint()}?${encode(page, event, extra)}`;
}

function sendOnUnload(page: string, event: string, extra: Params = {}): void {
  const body = new Blob([encode(page, event, extra)], { type: "application/x-www-form-urlencoded" });
  if (!navigator.sendBeacon?.(endpoint(), body)) send(page, event, extra);
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function sectionName(element: Element): string {
  const heading = element.querySelector("h1, h2, h3")?.textContent ?? "";
  const raw =
    (element as HTMLElement).dataset.track || element.id || element.getAttribute("aria-label") || heading;
  return slug(raw);
}

/** Classifies a link as e.g. "doi:10.1038/...", "pmid:123", "pdf:/x.pdf", "out:github.com/org/repo". */
function clickTarget(anchor: HTMLAnchorElement): string | null {
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#")) return null;
  if (href.startsWith("mailto:")) return "mailto";

  let url: URL;
  try {
    url = new URL(href, location.href);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");

  const doi = url.href.match(/doi\.org\/(10\.[^?#]+)/i) ?? url.pathname.match(/\/(10\.\d{4,9}\/[^?#]+)/);
  if (doi) return `doi:${decodeURIComponent(doi[1])}`;
  const pmid = host === "pubmed.ncbi.nlm.nih.gov" ? url.pathname.match(/^\/(\d+)/) : null;
  if (pmid) return `pmid:${pmid[1]}`;
  if (/\.pdf$/i.test(url.pathname)) return `pdf:${host}${url.pathname}`;

  const internal = url.origin === location.origin || url.origin === siteUrl;
  if (internal) return `nav:${url.pathname}`;
  return `out:${host}${url.pathname === "/" ? "" : url.pathname}`;
}

export function Analytics() {
  const pathname = usePathname();
  const pageRef = useRef(pathname);

  // One page view: open, scroll milestones, visible time, sections, and exit.
  useEffect(() => {
    if (!enabled()) return;
    const page = pathname;
    pageRef.current = page;

    const extra: Params = {};
    if (!firstOpenSent) {
      firstOpenSent = true;
      const search = new URLSearchParams(location.search);
      extra.r = document.referrer;
      extra.lg = navigator.language;
      extra.tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      extra.us = search.get("utm_source");
      extra.um = search.get("utm_medium");
      extra.uc = search.get("utm_campaign");
      extra.ref = search.get("ref");
    }
    send(page, "open", extra);

    const scrollSent = new Set<number>();
    const dwellSent = new Set<number>();
    const sectionsSent = new Set<string>();
    let visibleSeconds = 0;
    let exited = false;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - window.innerHeight;
        const percent = scrollable <= 0 ? 100 : Math.round((100 * window.scrollY) / scrollable);
        for (const mark of SCROLL_MARKS) {
          if (percent >= mark && !scrollSent.has(mark)) {
            scrollSent.add(mark);
            send(page, "scroll", { n: mark });
          }
        }
      });
    };

    // Counts only time the tab is visible, so a page left in a background tab is not "read for an hour".
    const ticker = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      visibleSeconds += 1;
      for (const mark of DWELL_MARKS) {
        if (visibleSeconds >= mark && !dwellSent.has(mark)) {
          dwellSent.add(mark);
          send(page, "dwell", { n: mark });
        }
      }
    }, 1000);

    // A section counts as read when half of it, or half the viewport, is on screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const enoughOfSection = entry.intersectionRatio >= 0.5;
          const fillsScreen = entry.intersectionRect.height >= window.innerHeight * 0.5;
          if (!enoughOfSection && !fillsScreen) continue;
          const name = sectionName(entry.target);
          if (!name || sectionsSent.has(name)) continue;
          sectionsSent.add(name);
          send(page, "view", { l: name });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    const observeFrame = requestAnimationFrame(() => {
      document.querySelectorAll(SECTION_SELECTOR).forEach((element) => observer.observe(element));
    });

    const exit = () => {
      if (exited) return;
      exited = true;
      sendOnUnload(page, "exit", { n: visibleSeconds });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", exit);
    onScroll();

    return () => {
      exit();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", exit);
      window.clearInterval(ticker);
      cancelAnimationFrame(observeFrame);
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  // Link clicks, delegated once for the whole document.
  useEffect(() => {
    if (!enabled()) return;
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const target = clickTarget(anchor);
      if (!target) return;
      const text = (anchor.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 120);
      // Outbound navigation may unload the page before an image request goes out.
      sendOnUnload(pageRef.current, "click", { l: target.slice(0, 160), d: text });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
