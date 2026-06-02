import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Essay } from "@/components/essay";
import type { EssayDocument } from "@/lib/essays/types";

jest.mock("@/components/essay/header", () => ({
    EssayHeader: () => createElement("div", { "data-essay-part": "header" }),
}));

jest.mock("@/components/essay/body", () => ({
    EssayBody: () => createElement("div", { "data-essay-part": "body" }),
}));

jest.mock("@/components/essay/footer", () => ({
    EssayFooter: () => createElement("div", { "data-essay-part": "footer" }),
}));

jest.mock("@/components/essay/discuss", () => ({
    EssayDiscuss: () =>
        createElement("div", { "data-essay-part": "discuss" }),
}));

const essay: EssayDocument = {
    slug: "test-essay",
    filePath: "test-essay.md",
    content: "Essay content.",
    frontMatter: {
        title: "Test Essay",
        description: "An essay used to verify shell ordering.",
        slug: "test-essay",
        publishDate: new Date("2026-06-02"),
        readingTime: 1,
        tags: ["test"],
        authors: ["Test Author"],
        draft: false,
    },
};

describe("Essay", () => {
    it("renders Discuss after the essay footer", () => {
        const html = renderToStaticMarkup(createElement(Essay, { essay }));

        expect(html.indexOf('data-essay-part="footer"')).toBeGreaterThan(-1);
        expect(html.indexOf('data-essay-part="discuss"')).toBeGreaterThan(-1);
        expect(html.indexOf('data-essay-part="footer"')).toBeLessThan(
            html.indexOf('data-essay-part="discuss"')
        );
    });
});
