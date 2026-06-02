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

    it("renders the compact Discuss section without eagerly loading Giscus", () => {
        const html = renderToStaticMarkup(createElement(EssayDiscuss));

        expect(html).toContain('id="essay-discuss-heading"');
        expect(html).toContain(">Discuss<");
        expect(html).toContain("Powered by Giscus");
        expect(mockGiscusProps).toHaveLength(0);
    });

    it("keeps the stable essay discussion mapping", () => {
        expect(giscusEssayConfig).toMatchObject({
            repo: "A-F-V/personal-portfolio",
            repoId: "R_kgDOK1iarQ",
            category: "Announcements",
            categoryId: "DIC_kwDOK1iarc4C-XDr",
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
