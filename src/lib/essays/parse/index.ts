import fs from "node:fs/promises";
import matter from "gray-matter";

import { essayFrontMatterSchema } from "./frontmatter/schema";
import { estimateReadingTime } from "./reading-time";
import { toEssayRelativePath } from "../fetch/list-files";
import {
    type EssayDocument,
    EssayFrontMatterError,
    type EssayFrontMatter,
    type EssayFrontMatterBase,
} from "../types";

export async function parseEssayFile(filePath: string): Promise<EssayDocument> {
    const relativePath = toEssayRelativePath(filePath);
    const raw = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(raw);

    const parsed = essayFrontMatterSchema.safeParse(data);

    if (!parsed.success) {
        throw new EssayFrontMatterError(
            `Invalid front matter in ${relativePath}`,
            parsed.error.issues,
            relativePath
        );
    }

    const frontMatterBase: EssayFrontMatterBase = parsed.data;
    const readingTime =
        typeof frontMatterBase.readingTime === "number"
            ? frontMatterBase.readingTime
            : estimateReadingTime(content);

    const frontMatter: EssayFrontMatter = {
        ...frontMatterBase,
        readingTime,
    };

    return {
        slug: frontMatter.slug,
        frontMatter,
        content,
        filePath: relativePath,
    };
}
