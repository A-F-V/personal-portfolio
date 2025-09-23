import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { parseEssayFile } from "@/lib/essays/parse";
import { listEssayFiles } from "@/lib/essays/fetch/list-files";
import { EssayFrontMatterError } from "@/lib/essays/types";

describe("parseEssayFile", () => {
    it("parses an existing essay and normalizes fields", async () => {
        const filePath = path.join(
            process.cwd(),
            "essays",
            "Overcoming Weak Inclinations.md"
        );
        const document = await parseEssayFile(filePath);

        expect(document.slug).toBe("overcoming-weak-inclinations");
        expect(document.frontMatter).toMatchObject({
            title: "Overcoming Weak Inclinations",
            publishDate: new Date("2024-10-16"),
            readingTime: 9.7,
            tags: ["personal-experience"],
            authors: ["Alessandro Farace"],
            description:
                "A personal reflection on transforming weak inclinations into deliberate habits that drive long-term progress.",
        });
        expect(document.frontMatter.draft).toBe(false);
        expect(document.filePath).toBe("Overcoming Weak Inclinations.md");
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

    it("computes the reading time when it is omitted", async () => {
        const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "essay-test-"));
        const tempFile = path.join(tempDir, "auto-reading-time.md");
        const words = Array(450).fill("word").join(" ");

        await fs.writeFile(
            tempFile,
            `---\ntitle: Auto Reading Time\ndescription: An essay without a preset reading time.\nslug: auto-reading-time\npublish_date: 2024-01-01\ntags:\n  - auto\nauthors:\n  - Test Author\ndraft: false\n---\n${words}`
        );

        const document = await parseEssayFile(tempFile);

        expect(document.frontMatter.readingTime).toBeCloseTo(2.6, 1);
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
