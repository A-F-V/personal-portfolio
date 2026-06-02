import type { Meta, StoryObj } from "@storybook/react";

import {
    EssayFooterContent,
    type EssayFooterPost,
} from "@/components/essay/footer";

const recentPosts: EssayFooterPost[] = [
    {
        href: "/essay/bootstrapping-missing-warning-labels",
        title: "Bootstrapping's Missing Warning Labels",
        publishDate: new Date("2025-12-17"),
    },
    {
        href: "/essay/file-over-app-philosophical-case",
        title: "File Over App: The Philosophical Case",
        publishDate: new Date("2024-11-26"),
    },
    {
        href: "/essay/overcoming-weak-inclinations",
        title: "Overcoming Weak Inclinations",
        publishDate: new Date("2024-12-18"),
    },
];

const meta = {
    title: "Essay/Footer",
    component: EssayFooterContent,
    args: {
        recentPosts,
    },
    decorators: [
        (Story) => (
            <main className="min-h-screen bg-background px-6 py-10 text-foreground lg:py-16">
                <article className="mx-auto flex w-full max-w-[720px] flex-col gap-8">
                    <div className="font-essay text-[1.125rem] leading-[1.7] text-foreground/80">
                        <p>
                            This story renders the compact essay outro in the
                            same max-width column used by essay pages.
                        </p>
                    </div>
                    <Story />
                </article>
            </main>
        ),
    ],
} satisfies Meta<typeof EssayFooterContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CompactColumns: Story = {};
