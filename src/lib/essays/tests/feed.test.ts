import { buildEssayRssXml, getEssayUrl } from "@/lib/essays/feed";
import type { EssayDocument } from "@/lib/essays/types";

function createEssay(
    slug: string,
    publishDate: string,
    overrides: Partial<EssayDocument["frontMatter"]> = {}
): EssayDocument {
    const title = overrides.title ?? slug;

    return {
        slug,
        filePath: `${slug}.md`,
        content: "Essay body",
        frontMatter: {
            title,
            description: `${title} description`,
            slug,
            publishDate: new Date(publishDate),
            readingTime: 1,
            tags: ["personal-experience"],
            authors: ["Alessandro Farace"],
            draft: false,
            ...overrides,
        },
    };
}

describe("essay RSS feed", () => {
    const siteUrl = "https://example.com";

    it("builds RSS XML with stable absolute essay links", async () => {
        const xml = await buildEssayRssXml(
            [
                createEssay("older-essay", "2024-01-01", {
                    title: "Older Essay",
                    description: "An older essay summary",
                    tags: ["archive", "essay"],
                }),
            ],
            { siteUrl }
        );

        expect(xml).toContain('<rss version="2.0"');
        expect(xml).toContain("<title>Alessandro Farace</title>");
        expect(xml).toContain("<link>https://example.com/</link>");
        expect(xml).toContain(
            "<link>https://example.com/essay/older-essay</link>"
        );
        expect(xml).toContain(
            "<description><![CDATA[An older essay summary]]></description>"
        );
        expect(xml).toContain("<category>archive</category>");
        expect(xml).toContain("<category>essay</category>");
    });

    it("includes full rendered essay HTML while keeping summaries separate", async () => {
        const xml = await buildEssayRssXml(
            [
                createEssay("full-content", "2024-01-01", {
                    title: "Full Content",
                    description: "Short front matter summary",
                }),
            ],
            { siteUrl }
        );

        expect(xml).toContain(
            "<description><![CDATA[Short front matter summary]]></description>"
        );
        expect(xml).toContain("<content:encoded><![CDATA[");
        expect(xml).toContain("<p>Essay body</p>");
    });

    it("makes local links and images absolute inside full feed content", async () => {
        const xml = await buildEssayRssXml(
            [
                {
                    ...createEssay("absolute-content", "2024-01-01"),
                    content:
                        "Read [the essay](/essay/older-essay) and ![Local chart](chart.png).",
                },
            ],
            { siteUrl }
        );

        expect(xml).toContain(
            '<a href="https://example.com/essay/older-essay">the essay</a>'
        );
        expect(xml).toContain(
            '<img src="https://example.com/essay-assets/chart.png" alt="Local chart">'
        );
    });

    it("preserves explicit external links inside full feed content", async () => {
        const xml = await buildEssayRssXml(
            [
                {
                    ...createEssay("external-link", "2024-01-01"),
                    content: "Visit [Janus](https://janus.cards).",
                },
            ],
            { siteUrl }
        );

        expect(xml).toContain('<a href="https://janus.cards">Janus</a>');
        expect(xml).not.toContain("https://example.com/janus.cards");
    });

    it("excludes drafts and orders published essays newest first", async () => {
        const xml = await buildEssayRssXml(
            [
                createEssay("old-published", "2024-01-01", {
                    title: "Old Published",
                }),
                createEssay("draft-essay", "2026-01-01", {
                    title: "Draft Essay",
                    draft: true,
                }),
                createEssay("new-published", "2025-01-01", {
                    title: "New Published",
                }),
            ],
            { siteUrl }
        );

        expect(xml).not.toContain("Draft Essay");
        expect(xml.indexOf("New Published")).toBeLessThan(
            xml.indexOf("Old Published")
        );
    });

    it("creates absolute essay URLs from slugs", () => {
        expect(getEssayUrl("example-essay", siteUrl)).toBe(
            "https://example.com/essay/example-essay"
        );
    });
});
