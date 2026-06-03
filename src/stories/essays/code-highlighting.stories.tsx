import type { Meta, StoryObj } from "@storybook/react";

import { EssayStoryPreview } from "./story-preview";

interface EssayCodeHighlightingStoryProps {
    content: string;
}

const sampleContent = [
    "This preview renders markdown through the essay pipeline, then displays the resulting code block with the scoped Catppuccin Mocha Prism theme.",
    "",
    "Inline code like `renderEssayContent()` should stay subtle inside prose.",
    "",
    "A titled fence uses `language:path` metadata so the renderer can show the source file above the highlighted block.",
    "",
    "```typescript:src/lib/essays/render/index.tsx",
    "export async function renderEssayContent(document: EssayDocument) {",
    "    const { result } = await processor.process(document.content);",
    "",
    "    return result;",
    "}",
    "```",
    "",
    "```typescript",
    'const palette = "catppuccin-mocha";',
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

function EssayCodeHighlightingStory({
    content,
}: EssayCodeHighlightingStoryProps) {
    return (
        <EssayStoryPreview
            content={content}
            description="Storybook preview for essay code highlighting."
            slug="storybook-code-highlighting"
            subtitle="Catppuccin Mocha for fenced essay code blocks."
            title="Code Highlighting"
        />
    );
}

const meta = {
    title: "Essays/Code Highlighting",
    component: EssayCodeHighlightingStory,
    args: {
        content: sampleContent,
    },
} satisfies Meta<typeof EssayCodeHighlightingStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CatppuccinMocha: Story = {};
