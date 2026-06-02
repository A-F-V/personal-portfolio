import {
    getRecentEssayFooterPosts,
    type EssayFooterPostSource,
} from "@/components/essay/recent-posts";

function createPost(
    slug: string,
    title: string,
    publishDate: string,
    draft = false
): EssayFooterPostSource {
    return {
        slug,
        frontMatter: {
            title,
            publishDate: new Date(publishDate),
            draft,
        },
    };
}

describe("getRecentEssayFooterPosts", () => {
    it("excludes the current essay from the recent posts column", () => {
        const posts = getRecentEssayFooterPosts(
            [
                createPost("current", "Current Essay", "2026-01-03"),
                createPost("next", "Next Essay", "2026-01-02"),
            ],
            "current"
        );

        expect(posts).toEqual([
            {
                href: "/essay/next",
                title: "Next Essay",
                publishDate: new Date("2026-01-02"),
            },
        ]);
    });

    it("limits the footer to the three newest non-draft posts", () => {
        const posts = getRecentEssayFooterPosts(
            [
                createPost("draft", "Draft Essay", "2026-01-05", true),
                createPost("first", "First Essay", "2026-01-04"),
                createPost("second", "Second Essay", "2026-01-03"),
                createPost("third", "Third Essay", "2026-01-02"),
                createPost("fourth", "Fourth Essay", "2026-01-01"),
            ],
            "not-present"
        );

        expect(posts.map((post) => post.title)).toEqual([
            "First Essay",
            "Second Essay",
            "Third Essay",
        ]);
    });

    it("sorts newest first before applying the recent post limit", () => {
        const posts = getRecentEssayFooterPosts(
            [
                createPost("old", "Old Essay", "2026-01-01"),
                createPost("new", "New Essay", "2026-01-03"),
                createPost("middle", "Middle Essay", "2026-01-02"),
            ],
            "not-present",
            2
        );

        expect(posts.map((post) => post.href)).toEqual([
            "/essay/new",
            "/essay/middle",
        ]);
    });
});
