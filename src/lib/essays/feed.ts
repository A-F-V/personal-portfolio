import { Feed } from "feed";

import {
    createSiteUrl,
    getSiteUrl,
    RSS_FEED_PATH,
    SITE_DESCRIPTION,
    SITE_NAME,
} from "@/lib/site";
import { renderEssayHtml } from "./render";
import type { EssayDocument } from "./types";

interface BuildEssayFeedOptions {
    siteUrl?: string;
}

function getPublishedEssays(essays: EssayDocument[]): EssayDocument[] {
    return essays
        .filter((essay) => !essay.frontMatter.draft)
        .sort(
            (a, b) =>
                b.frontMatter.publishDate.getTime() -
                a.frontMatter.publishDate.getTime()
        );
}

export function getEssayUrl(slug: string, siteUrl?: string): string {
    return createSiteUrl(`/essay/${slug}`, siteUrl);
}

async function buildEssayFeed(
    essays: EssayDocument[],
    options: BuildEssayFeedOptions = {}
): Promise<Feed> {
    const publishedEssays = getPublishedEssays(essays);
    const siteUrl = options.siteUrl ?? getSiteUrl();
    const homeUrl = createSiteUrl("/", siteUrl);
    const feedUrl = createSiteUrl(RSS_FEED_PATH, siteUrl);

    const feed = new Feed({
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        id: homeUrl,
        link: homeUrl,
        language: "en",
        updated: publishedEssays[0]?.frontMatter.publishDate,
        feed: feedUrl,
        feedLinks: {
            rss: feedUrl,
        },
        author: {
            name: SITE_NAME,
            link: homeUrl,
        },
        copyright: `All rights reserved ${new Date().getFullYear()}, ${SITE_NAME}`,
    });

    for (const essay of publishedEssays) {
        const { frontMatter, slug } = essay;
        const link = getEssayUrl(slug, siteUrl);

        feed.addItem({
            title: frontMatter.title,
            id: link,
            guid: link,
            link,
            description: frontMatter.description,
            content: await renderEssayHtml(essay, siteUrl),
            date: frontMatter.publishDate,
            published: frontMatter.publishDate,
            author: frontMatter.authors.map((name) => ({ name })),
            category: frontMatter.tags.map((name) => ({ name })),
        });
    }

    return feed;
}

export function buildEssayRssXml(
    essays: EssayDocument[],
    options: BuildEssayFeedOptions = {}
): Promise<string> {
    return buildEssayFeed(essays, options).then((feed) => feed.rss2());
}
