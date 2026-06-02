import type { Meta, StoryObj } from "@storybook/react";

import { EssayStoryPreview } from "./story-preview";

interface EssayCalloutsStoryProps {
    content: string;
}

const sampleContent = [
    "This preview renders Obsidian callouts through the essay compiler, then applies the scoped essay callout styles.",
    "",
    "> [!NOTE]",
    "> Notes use the quiet informational treatment for neutral explanatory context.",
    "",
    "> [!INSIGHT]",
    "> Insight callouts are for the main takeaways that should visually stand apart from the prose.",
    "",
    "> [!WARNING] Cascade edge case",
    "> Warning callouts preserve explicit marker titles and use the warmer caution palette.",
    "",
    "> [!SUCCESS]",
    "> Success callouts can mark a recommended outcome or a verified result.",
    "",
    "> [!QUESTION]",
    "> Question callouts are useful for open decisions that should survive a draft pass.",
    "",
    "> [!DANGER]",
    "> Danger callouts are reserved for sharp failure modes or destructive actions.",
].join("\n");

function EssayCalloutsStory({ content }: EssayCalloutsStoryProps) {
    return (
        <EssayStoryPreview
            content={content}
            description="Storybook preview for Obsidian callout rendering."
            slug="storybook-callouts"
            subtitle="Obsidian callout syntax rendered through the essay pipeline."
            title="Callouts"
        />
    );
}

const meta = {
    title: "Essays/Callouts",
    component: EssayCalloutsStory,
    args: {
        content: sampleContent,
    },
} satisfies Meta<typeof EssayCalloutsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ObsidianVariants: Story = {};
