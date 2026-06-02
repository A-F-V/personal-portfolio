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
                "const label: string = \"demo\";",
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
});
