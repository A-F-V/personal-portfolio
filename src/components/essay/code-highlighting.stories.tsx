import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState, type ReactNode } from "react";

import { renderEssayContent } from "@/lib/essays/render";
import type { EssayDocument } from "@/lib/essays/types";
import { essayBodyClassName } from "@/components/essay/body";

interface EssayCodeHighlightingStoryProps {
    content: string;
}

const sampleContent = [
    "This preview renders markdown through the essay pipeline, then displays the resulting code block with the scoped Catppuccin Mocha Prism theme.",
    "",
    "Inline code like `renderEssayContent()` should stay subtle inside prose.",
    "",
    "```typescript",
    "const palette = \"catppuccin-mocha\";",
    "",
    "export function describeTheme(tokenCount: number) {",
    "    return `${palette}: ${tokenCount} tokens highlighted`;",
    "}",
    "```",
    "",
    "Unsupported language fences should still render as readable code.",
    "",
    "```not-a-real-language",
    "value = 1",
    "```",
].join("\n");

function createStoryEssay(content: string): EssayDocument {
    return {
        slug: "storybook-code-highlighting",
        filePath: "storybook-code-highlighting.md",
        content,
        frontMatter: {
            title: "Storybook Code Highlighting",
            description: "Storybook preview for essay code highlighting.",
            slug: "storybook-code-highlighting",
            publishDate: new Date("2026-06-02"),
            readingTime: 1,
            tags: ["storybook"],
            authors: ["Storybook"],
            draft: false,
        },
    };
}

function EssayCodeHighlightingStory({
    content,
}: EssayCodeHighlightingStoryProps) {
    const [essayContent, setEssayContent] = useState<ReactNode>(null);

    useEffect(() => {
        let isMounted = true;

        setEssayContent(null);
        void renderEssayContent(createStoryEssay(content)).then((result) => {
            if (isMounted) {
                setEssayContent(result);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [content]);

    return (
        <main className="min-h-screen bg-background px-6 py-10 text-foreground lg:py-16">
            <article className="mx-auto flex w-full max-w-[720px] flex-col gap-8">
                <header className="flex flex-col gap-3">
                    <h1 className="font-serif text-5xl font-bold leading-[1.2] tracking-tight text-foreground lg:text-7xl">
                        Code Highlighting
                    </h1>
                    <p className="font-serif text-xl italic leading-relaxed text-foreground/70 lg:text-2xl">
                        Catppuccin Mocha for fenced essay code blocks.
                    </p>
                    <hr className="mt-2 border-foreground/10" />
                </header>

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

const meta = {
    title: "Essay/Code Highlighting",
    component: EssayCodeHighlightingStory,
    args: {
        content: sampleContent,
    },
} satisfies Meta<typeof EssayCodeHighlightingStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CatppuccinMocha: Story = {};
