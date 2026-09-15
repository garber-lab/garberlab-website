import assert from "node:assert/strict";
import { test } from "node:test";
import {
  adminFilters,
  clientAddress,
  isAllowedSource,
  isBot,
  orgLabel,
  parseBasicAuth,
  parseEvent,
  referrerHost,
  registrableDomain,
  reverseName,
  secretsMatch,
} from "./lib.ts";

const base = { e: "open", s: "abc123def456", p: "/people" };
const params = (extra: Record<string, string> = {}) => new URLSearchParams({ ...base, ...extra });

test("parseEvent accepts a well-formed open event", () => {
  const event = parseEvent(params({ r: "https://www.google.com/", lg: "en-US", us: "newsletter" }));
  assert.ok(event);
  assert.equal(event.event, "open");
  assert.equal(event.page, "/people");
  assert.equal(event.referrer, "https://www.google.com/");
  assert.equal(event.utmSource, "newsletter");
  assert.equal(event.value, null);
});

test("parseEvent rejects unknown events, bad sids and bad pages", () => {
  assert.equal(parseEvent(params({ e: "drop-table" })), null);
  assert.equal(parseEvent(params({ s: "SHORT" })), null);
  assert.equal(parseEvent(params({ s: "has spaces in it!" })), null);
  assert.equal(parseEvent(params({ p: "https://evil.example/" })), null);
  assert.equal(parseEvent(params({ p: "/" + "x".repeat(250) })), null);
});

test("parseEvent requires values and labels where they carry meaning", () => {
  assert.equal(parseEvent(params({ e: "scroll" })), null);
  assert.equal(parseEvent(params({ e: "scroll", n: "-5" })), null);
  assert.equal(parseEvent(params({ e: "scroll", n: "250" }))?.value, 100);
  assert.equal(parseEvent(params({ e: "exit", n: "999999" }))?.value, 86400);
  assert.equal(parseEvent(params({ e: "view" })), null);
  assert.equal(parseEvent(params({ e: "click", l: "doi:10.1038/s41590-020-0691-3" }))?.label, "doi:10.1038/s41590-020-0691-3");
});

test("parseEvent caps field length and strips control characters", () => {
  const event = parseEvent(params({ e: "click", l: "out:" + "a".repeat(500), d: "line\none" }));
  assert.ok(event);
  assert.equal(event.label?.length, 160);
  assert.equal(event.detail, "line one");
});

test("isAllowedSource only accepts the lab site hosts", () => {
  assert.ok(isAllowedSource(null, "https://garberlab.umassmed.edu/"));
  assert.ok(isAllowedSource("https://garberlab-website.manuel-garber.workers.dev", null));
  assert.ok(isAllowedSource("http://localhost:8787", null));
  assert.ok(isAllowedSource(null, "https://analytics-preview-garberlab-website.manuel-garber.workers.dev/"));
  assert.equal(isAllowedSource(null, "https://garberlab-website.someone-else.workers.dev/"), false);
  assert.equal(isAllowedSource(null, "https://evil-garberlab-website.manuel-garber.workers.dev.example/"), false);
  assert.equal(isAllowedSource(null, "https://garberlab.umassmed.edu.evil.example/"), false);
  assert.equal(isAllowedSource(null, null), false);
  assert.equal(isAllowedSource("null", "not a url"), false);
});

test("referrerHost ignores internal referrers and strips www", () => {
  assert.equal(referrerHost("https://www.google.com/search?q=garber"), "google.com");
  assert.equal(referrerHost("https://garberlab.umassmed.edu/people"), null);
  assert.equal(referrerHost(null), null);
});

test("isBot flags crawlers, headless browsers and missing headers", () => {
  const chrome = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
  assert.equal(isBot(chrome, "en-US"), false);
  assert.equal(isBot(chrome, null), true);
  assert.equal(isBot("Mozilla/5.0 (compatible; Googlebot/2.1)", "en"), true);
  assert.equal(isBot("Mozilla/5.0 HeadlessChrome/140.0", "en"), true);
  assert.equal(isBot(null, "en"), true);
});

test("clientAddress prefers the visitor IP from the proxy when the beacon came through Apache", () => {
  const direct = new Headers({ "cf-connecting-ip": "203.0.113.9" });
  assert.deepEqual(clientAddress(direct), { ip: "203.0.113.9", viaProxy: false });

  const proxied = new Headers({
    "cf-connecting-ip": "146.189.1.1",
    "x-forwarded-host": "garberlab.umassmed.edu",
    "x-forwarded-for": "198.51.100.7, 10.0.0.2",
  });
  assert.deepEqual(clientAddress(proxied), { ip: "198.51.100.7", viaProxy: true });
});

test("reverseName builds PTR names for IPv4 and IPv6", () => {
  assert.equal(reverseName("192.0.2.10"), "10.2.0.192.in-addr.arpa");
  assert.equal(reverseName("999.0.2.10"), null);
  assert.equal(
    reverseName("2001:db8::1"),
    "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa",
  );
  assert.equal(reverseName("2001:db8::1::2"), null);
  assert.equal(reverseName("hello"), null);
});

test("registrableDomain handles country second-level domains", () => {
  assert.equal(registrableDomain("dhcp-10-2.med.harvard.edu."), "harvard.edu");
  assert.equal(registrableDomain("vpn.ox.ac.uk"), "ox.ac.uk");
  assert.equal(registrableDomain("c-73-1.hsd1.ma.comcast.net"), "comcast.net");
  assert.equal(registrableDomain("localhost"), null);
  assert.equal(registrableDomain(null), null);
});

test("orgLabel falls back from AS organization to rDNS domain", () => {
  assert.equal(orgLabel("Harvard University", "harvard.edu"), "Harvard University");
  assert.equal(orgLabel(null, "harvard.edu"), "harvard.edu");
  assert.equal(orgLabel(null, null), "Unknown");
});

test("parseBasicAuth and secretsMatch", async () => {
  const header = "Basic " + btoa("admin:correct horse:battery");
  assert.deepEqual(parseBasicAuth(header), { user: "admin", password: "correct horse:battery" });
  assert.equal(parseBasicAuth("Bearer x"), null);
  assert.equal(parseBasicAuth("Basic !!!"), null);
  assert.equal(await secretsMatch("abc", "abc"), true);
  assert.equal(await secretsMatch("abc", "abd"), false);
  assert.equal(await secretsMatch("", "abc"), false);
});

test("adminFilters clamps unknown values to defaults", () => {
  const filters = adminFilters(new URL("https://x/admin/api/overview?days=13&bots=1&tzo=240"));
  assert.equal(filters.bots, true);
  assert.equal(filters.hideUmass, false);
  assert.equal(filters.tzOffset, 240);
  assert.ok(Math.abs(Date.now() - 30 * 86_400_000 - filters.since) < 1000);
  assert.equal(adminFilters(new URL("https://x/?tzo=99999")).tzOffset, 0);
});
