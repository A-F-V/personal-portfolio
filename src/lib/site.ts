export const SITE_NAME = "Alessandro Farace";
export const SITE_DESCRIPTION = "Personal website of Alessandro Farace";
export const DEFAULT_SITE_URL = "https://alessandrofarace.com";
export const RSS_FEED_PATH = "/rss.xml";

export function getSiteUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
}

export function createSiteUrl(pathname: string, siteUrl = getSiteUrl()): string {
    return new URL(pathname, siteUrl).toString();
}
