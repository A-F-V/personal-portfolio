import { getAllEssays } from "@/lib/essays";
import { renderEssayContent } from "@/lib/essays/render";

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
});
