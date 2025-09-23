import path from "node:path";
import { listEssayFiles } from "./fetch/list-files";
import { parseEssayFile } from "./parse";
import { DuplicateEssaySlugError, EssayDocument } from "./types";

interface EssayCacheEntry {
    document: EssayDocument;
    absolutePath: string;
}

type EssayCache = Map<string, EssayCacheEntry>;

let cachePromise: Promise<EssayCache> | null = null;

async function buildCache(): Promise<EssayCache> {
    const files = await listEssayFiles();
    const cache: EssayCache = new Map();
    const slugToFiles = new Map<string, string[]>();

    for (const file of files) {
        const document = await parseEssayFile(file);
        const entries = slugToFiles.get(document.slug) ?? [];
        entries.push(document.filePath);
        slugToFiles.set(document.slug, entries);

        cache.set(document.slug, {
            document,
            absolutePath: path.resolve(file),
        });
    }

    const duplicates = Array.from(slugToFiles.entries()).filter(
        ([, paths]) => paths.length > 1
    );

    if (duplicates.length > 0) {
        const [slug, paths] = duplicates[0];
        throw new DuplicateEssaySlugError(slug, paths);
    }

    return cache;
}

export async function getEssays(): Promise<EssayDocument[]> {
    if (!cachePromise) {
        cachePromise = buildCache();
    }
    const essays = await cachePromise;
    return Array.from(essays.values())
        .map((entry) => entry.document)
        .sort(
            (a, b) =>
                b.frontMatter.publishDate.getTime() -
                a.frontMatter.publishDate.getTime()
        );
}
