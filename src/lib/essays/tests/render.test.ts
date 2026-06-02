import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { getAllEssays } from "@/lib/essays";
import { renderEssayContent } from "@/lib/essays/render";
import type { EssayDocument } from "@/lib/essays/types";

function createTestEssay(content: string): EssayDocument {
    return {
        slug: "syntax-test",
        filePath: "syntax-test.md",
        content,
        frontMatter: {
            title: "Syntax Test",
            description: "Synthetic essay used to verify markdown rendering.",
            slug: "syntax-test",
            publishDate: new Date("2026-06-02"),
            readingTime: 1,
            tags: [],
            authors: ["Test Author"],
            draft: false,
        },
    };
}

async function renderEssayHtml(content: string): Promise<string> {
    const essayContent = await renderEssayContent(createTestEssay(content));
    return renderToStaticMarkup(createElement(Fragment, null, essayContent));
}

describe("renderEssayContent", () => {
    it("renders all non-draft essays", async () => {
        const essays = await getAllEssays();
        const nonDraftEssays = essays.filter(
            (essay) => !essay.frontMatter.draft
        );
        const renderedEssays = await Promise.all(
            nonDraftEssays.map((essay) => renderEssayContent(essay))
        );
        expect(renderedEssays).toBeDefined();
    });

    it("adds syntax highlighting classes to fenced code blocks", async () => {
        const html = await renderEssayHtml(
            [
                "```typescript {2}",
                'const label: string = "demo";',
                "export const answer = 42;",
                "```",
            ].join("\n")
        );

        expect(html).toContain("language-typescript");
        expect(html).toContain("code-highlight");
        expect(html).toContain("code-line");
        expect(html).not.toContain("highlight-line");
        expect(html).not.toContain("line-number");
        expect(html).toContain("token keyword");
    });

    it("renders code blocks with unknown languages without failing", async () => {
        const html = await renderEssayHtml(
            ["```not-a-real-language", "value = 1", "```"].join("\n")
        );

        expect(html).toContain("code-highlight");
        expect(html).toContain("value = 1");
    });

    it("renders Obsidian callouts without marker text", async () => {
        const html = await renderEssayHtml(
            "> [!NOTE]\n> `bg-primary/10` is Tailwind for having a primary background."
        );

        expect(html).toContain("bg-primary/10");
        expect(html).toContain("is Tailwind for having a primary background.");
        expect(html).toContain("essay-callout-title");
        expect(html).toContain("ⓘ Note");
        expect(html).not.toContain("[!NOTE]");
    });

    it("preserves callout type metadata", async () => {
        const html = await renderEssayHtml(
            "> [!INSIGHT]\n> The application owns theming."
        );

        expect(html).toContain('data-callout="insight"');
        expect(html).toContain("essay-callout");
        expect(html).toContain("essay-callout--insight");
        expect(html).toContain("essay-callout--tone-insight");
        expect(html).toContain("✦ Insight");
        expect(html).not.toContain("[!INSIGHT]");
    });

    it("preserves explicit callout titles in the injected title row", async () => {
        const html = await renderEssayHtml(
            "> [!WARNING] CSS cascade\n> Source order still matters."
        );

        expect(html).toContain("essay-callout--tone-warning");
        expect(html).toContain("! Warning: CSS cascade");
        expect(html).toContain("Source order still matters.");
    });

    it("preserves real external and hash links", async () => {
        const html = await renderEssayHtml(
            "[Docs](https://example.com) and [Section](#solution)"
        );

        expect(html).toContain('<a href="https://example.com">Docs</a>');
        expect(html).toContain('<a href="#solution">Section</a>');
    });
});
