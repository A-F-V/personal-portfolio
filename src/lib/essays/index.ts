import { getEssays } from "./cache";
import { EssayDocument, EssayNotFoundError } from "./types";

/// -----------------------------
/// Exported functions
/// -----------------------------

interface GetAllEssaysOptions {
    includeDrafts?: boolean;
}

export async function getAllEssays(
    options: GetAllEssaysOptions = {}
): Promise<EssayDocument[]> {
    const { includeDrafts = false } = options;
    const cache = await getEssays();

    const essays = cache.filter(
        (essay) => includeDrafts || !essay.frontMatter.draft
    );

    return essays;
}

export async function listEssaySlugs(
    options: GetAllEssaysOptions = {}
): Promise<string[]> {
    const essays = await getAllEssays(options);
    return essays.map((essay) => essay.slug);
}

export async function getEssayBySlug(
    slug: string,
    options: GetAllEssaysOptions = {}
): Promise<EssayDocument> {
    const { includeDrafts = false } = options;
    const cache = await getEssays();
    const entry = cache.find((essay) => essay.slug === slug);

    if (!entry) {
        throw new EssayNotFoundError(slug);
    }

    if (!includeDrafts && entry.frontMatter.draft) {
        throw new EssayNotFoundError(slug);
    }

    return entry;
}
