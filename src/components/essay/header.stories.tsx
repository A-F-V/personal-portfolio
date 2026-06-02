import type { Meta, StoryObj } from "@storybook/react";

import { EssayHeader } from "@/components/essay/header";
import type { EssayFrontMatter } from "@/lib/essays/types";

const substackFrontMatter: EssayFrontMatter = {
    title: "Bootstrapping's Missing Warning Labels",
    subtitle:
        "What startup advice misses when the company is one person and the runway is personal.",
    description: "Storybook preview for a Substack-backed essay header.",
    slug: "bootstrapping-missing-warning-labels",
    publishDate: new Date("2025-12-17"),
    readingTime: 7,
    tags: ["personal-experience", "business"],
    authors: ["Alessandro Farace"],
    draft: false,
    canonicalUrl:
        "https://alessandrofv.substack.com/p/bootstrappings-missing-warning-labels",
};

const siteOnlyFrontMatter: EssayFrontMatter = {
    ...substackFrontMatter,
    title: "The Path Less Travelled",
    subtitle: "A quieter essay header without an external canonical CTA.",
    description: "Storybook preview for a site-native essay header.",
    slug: "path-less-travelled",
    publishDate: new Date("2024-09-03"),
    readingTime: 5,
    tags: ["personal"],
    canonicalUrl: undefined,
};

interface EssayHeaderStoryProps {
    frontMatter: EssayFrontMatter;
    width?: number;
}

function EssayHeaderStory({ frontMatter, width = 720 }: EssayHeaderStoryProps) {
    return (
        <main className="min-h-screen bg-background px-6 py-10 text-foreground">
            <article
                className="mx-auto flex w-full flex-col gap-4"
                style={{ maxWidth: width }}
            >
                <EssayHeader frontMatter={frontMatter} />
            </article>
        </main>
    );
}

const meta = {
    title: "Essay/Header",
    component: EssayHeaderStory,
    args: {
        frontMatter: substackFrontMatter,
        width: 720,
    },
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EssayHeaderStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SubstackCanonical: Story = {};

export const MobileSubstackCanonical: Story = {
    args: {
        frontMatter: substackFrontMatter,
        width: 342,
    },
};

export const SiteOnly: Story = {
    args: {
        frontMatter: siteOnlyFrontMatter,
    },
};
