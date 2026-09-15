/** Public origin of the site. Apache at this host proxies to the Cloudflare Worker. */
export const siteUrl = "https://garberlab.umassmed.edu";

/**
 * Engagement beacon. Sent straight to the workers.dev host rather than through the
 * UMass proxy, so Cloudflare sees the visitor's own IP, organization, and location.
 */
export const trackEndpoint = "https://garberlab-website.manuel-garber.workers.dev/_t";
