import { toAbsoluteEssayHtmlUrl } from "@/lib/essays/render/rehype/absolute-urls";

describe("toAbsoluteEssayHtmlUrl", () => {
    const siteUrl = "https://example.com";

    it("keeps absolute URLs unchanged", () => {
        expect(toAbsoluteEssayHtmlUrl("https://janus.cards", siteUrl)).toBe(
            "https://janus.cards"
        );
    });

    it("keeps hash links unchanged", () => {
        expect(toAbsoluteEssayHtmlUrl("#section", siteUrl)).toBe("#section");
    });

    it("makes root-relative URLs absolute", () => {
        expect(toAbsoluteEssayHtmlUrl("/essay/example", siteUrl)).toBe(
            "https://example.com/essay/example"
        );
    });

    it("treats scheme-less links as site-relative", () => {
        expect(toAbsoluteEssayHtmlUrl("janus.cards", siteUrl)).toBe(
            "https://example.com/janus.cards"
        );
    });
});
