import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { EssayDiscuss } from "@/components/essay/discuss";
import { giscusEssayConfig } from "@/lib/giscus";

const mockGiscusProps: Array<Record<string, unknown>> = [];

jest.mock(
    "@giscus/react",
    () => ({
        __esModule: true,
        default: (props: Record<string, unknown>) => {
            mockGiscusProps.push(props);
            return createElement("div", { "data-giscus": "mock" });
        },
    }),
    { virtual: true }
);

describe("EssayDiscuss", () => {
    beforeEach(() => {
        mockGiscusProps.length = 0;
    });

    it("renders the compact Discuss section with the stable essay discussion mapping", () => {
        const html = renderToStaticMarkup(createElement(EssayDiscuss));

        expect(html).toContain('id="essay-discuss-heading"');
        expect(html).toContain(">Discuss<");
        expect(html).not.toContain("Comments are powered by GitHub Discussions.");
        expect(mockGiscusProps).toHaveLength(1);
        expect(mockGiscusProps[0]).toMatchObject({
            id: "essay-discussion",
            repo: giscusEssayConfig.repo,
            repoId: giscusEssayConfig.repoId,
            category: giscusEssayConfig.category,
            categoryId: giscusEssayConfig.categoryId,
            mapping: "pathname",
            strict: "1",
            reactionsEnabled: "1",
            emitMetadata: "0",
            inputPosition: "bottom",
            theme: "light",
            lang: "en",
            loading: "lazy",
        });
    });
});
