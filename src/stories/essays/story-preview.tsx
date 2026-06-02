import {
    useEffect,
    useMemo,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";

import { renderEssayContent } from "@/lib/essays/render";
import type { EssayDocument } from "@/lib/essays/types";

import { essayBodyClassName } from "@/components/essay/body";
import { EssayHeader } from "@/components/essay/header";

interface EssayStoryPreviewProps {
    content: string;
    description: string;
    slug: string;
    subtitle: string;
    title: string;
}

function createStoryEssay({
    content,
    description,
    slug,
    title,
    subtitle,
}: Pick<
    EssayStoryPreviewProps,
    "content" | "description" | "slug" | "subtitle" | "title"
>): EssayDocument {
    return {
        slug,
        filePath: `${slug}.md`,
        content,
        frontMatter: {
            title,
            description,
            subtitle,
            slug,
            publishDate: new Date("2026-06-02"),
            readingTime: 1,
            tags: ["storybook"],
            authors: ["Storybook"],
            draft: false,
        },
    };
}

const essayCanvasStyle = {
    "--primary": "#1e3a8a",
    "--secondary": "#e8593c",
    "--destructive": "#e8593c",
    "--muted": "#f6efe0",
    "--background": "#faf7ef",
    "--card": "#fcfbf8",
    "--popover": "#fcfbf8",
    "--muted-foreground": "#8593a5",
    "--foreground": "#0e1b3d",
    "--card-foreground": "#0e1b3d",
    "--popover-foreground": "#0e1b3d",
    "--primary-foreground": "#fcfbf8",
    "--secondary-foreground": "#fcfbf8",
    "--destructive-foreground": "#fcfbf8",
    "--border": "#f6efe0",
    "--input": "#f6efe0",
    "--ring": "#f6efe0",
} as CSSProperties;

export function EssayStoryPreview({
    content,
    description,
    slug,
    subtitle,
    title,
}: EssayStoryPreviewProps) {
    const [essayContent, setEssayContent] = useState<ReactNode>(null);
    const essay = useMemo(
        () =>
            createStoryEssay({
                content,
                description,
                slug,
                subtitle,
                title,
            }),
        [content, description, slug, subtitle, title]
    );

    useEffect(() => {
        let isMounted = true;

        setEssayContent(null);
        void renderEssayContent(essay).then((result) => {
            if (isMounted) {
                setEssayContent(result);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [essay]);

    return (
        <main
            className="min-h-screen bg-background text-foreground"
            style={essayCanvasStyle}
        >
            <article className="mx-auto flex w-full max-w-[720px] flex-col gap-4 px-6 py-8 lg:gap-8 lg:py-12">
                <EssayHeader frontMatter={essay.frontMatter} />
                <div className={essayBodyClassName}>
                    {essayContent ?? (
                        <p className="text-foreground/60">
                            Rendering essay markdown...
                        </p>
                    )}
                </div>
            </article>
        </main>
    );
}
