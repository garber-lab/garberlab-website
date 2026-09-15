-- Engagement analytics. One row per browser-tab session, one row per tracked event.
-- Timestamps are milliseconds since the Unix epoch (UTC).

CREATE TABLE sessions (
  sid          TEXT PRIMARY KEY,
  first_ts     INTEGER NOT NULL,
  last_ts      INTEGER NOT NULL,
  host         TEXT,
  ip           TEXT,              -- nulled by the daily cron after 90 days
  via_proxy    INTEGER NOT NULL DEFAULT 0,
  asn          INTEGER,
  as_org       TEXT,
  rdns         TEXT,
  rdns_domain  TEXT,
  country      TEXT,
  region       TEXT,
  city         TEXT,
  tz           TEXT,
  ua           TEXT,
  lang         TEXT,
  referrer     TEXT,
  referrer_host TEXT,
  landing_page TEXT,
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  ref          TEXT,
  is_bot       INTEGER NOT NULL DEFAULT 0,
  max_scroll   INTEGER NOT NULL DEFAULT 0,
  max_dwell    INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX sessions_first_ts ON sessions (first_ts);
CREATE INDEX sessions_ip ON sessions (ip);

CREATE TABLE events (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  ts     INTEGER NOT NULL,
  sid    TEXT NOT NULL,
  page   TEXT NOT NULL,
  event  TEXT NOT NULL,           -- open | scroll | dwell | view | click | exit
  label  TEXT,                    -- section name, or click target such as "doi:10.1038/..."
  detail TEXT,                    -- link text for clicks
  value  INTEGER                  -- scroll percent or seconds
);

CREATE INDEX events_ts ON events (ts);
CREATE INDEX events_sid ON events (sid);
CREATE INDEX events_page_event ON events (page, event);

CREATE TABLE ip_info (
  ip           TEXT PRIMARY KEY,
  rdns         TEXT,
  looked_up_at INTEGER NOT NULL
);
