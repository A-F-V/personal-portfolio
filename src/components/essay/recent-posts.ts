const DEFAULT_RECENT_POST_LIMIT = 3;

export interface EssayFooterPostSource {
    slug: string;
    frontMatter: {
        title: string;
        publishDate: Date;
        draft?: boolean;
    };
}

export interface EssayFooterPost {
    href: string;
    title: string;
    publishDate: Date;
}

export function getRecentEssayFooterPosts(
    essays: EssayFooterPostSource[],
    currentSlug: string,
    limit = DEFAULT_RECENT_POST_LIMIT
): EssayFooterPost[] {
    return essays
        .filter(
            (essay) => essay.slug !== currentSlug && !essay.frontMatter.draft
        )
        .sort(
            (a, b) =>
                b.frontMatter.publishDate.getTime() -
                a.frontMatter.publishDate.getTime()
        )
        .slice(0, limit)
        .map((essay) => ({
            href: `/essay/${essay.slug}`,
            title: essay.frontMatter.title,
            publishDate: essay.frontMatter.publishDate,
        }));
}
