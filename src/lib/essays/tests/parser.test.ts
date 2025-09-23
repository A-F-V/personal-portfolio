import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { parseEssayFile } from "@/lib/essays/parse";
import { listEssayFiles } from "@/lib/essays/fetch/list-files";
import { EssayFrontMatterError } from "@/lib/essays/types";

describe("parseEssayFile", () => {
    it("parses an existing essay and normalizes fields", async () => {
        const filePath = path.join(process.cwd(), "essays", "Example Essay.md");
        const document = await parseEssayFile(filePath);

        expect(document.slug).toBe("test");
        expect(document.frontMatter).toMatchObject({
            title: "Example Essay",
            subtitle: "Just for demonstration",
            publishDate: new Date("2025-09-22"),
            readingTime: 9,
            tags: ["example"],
            authors: ["Alessandro Farace"],
        });
        expect(typeof document.frontMatter.draft).toBe("boolean");
        expect(document.filePath).toBe("Example Essay.md");
    });

    it("throws an EssayFrontMatterError when front matter is invalid", async () => {
        const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "essay-test-"));
        const tempFile = path.join(tempDir, "invalid.md");

        await fs.writeFile(
            tempFile,
            `---\ntitle: Missing Fields\n---\ncontent`
        );

        await expect(parseEssayFile(tempFile)).rejects.toBeInstanceOf(
            EssayFrontMatterError
        );
    });

    it("parses every essay file in the repository", async () => {
        const files = await listEssayFiles();
        expect(files.length).toBeGreaterThan(0);

        const results = await Promise.all(
            files.map((file) => parseEssayFile(file))
        );

        for (const document of results) {
            expect(document.slug).toBeTruthy();
            expect(document.content).toBeDefined();
        }
    });
});
