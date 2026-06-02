import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import { EssayTagBadge } from "@/components/essay-tag-badge";

const sampleTags = ["personal-experience", "business", "software"];

const surfaceSamples = [
    {
        name: "Essay light",
        className: "bg-[#faf7ef]",
        style: {
            "--foreground": "#0e1b3d",
            color: "#0e1b3d",
        } as CSSProperties,
    },
    {
        name: "Homepage blue",
        className: "bg-[#0e406f]",
        style: {
            "--foreground": "#faf7ef",
            color: "#faf7ef",
        } as CSSProperties,
    },
    {
        name: "Deep footer",
        className: "bg-[#02223f]",
        style: {
            "--foreground": "#faf7ef",
            color: "#faf7ef",
        } as CSSProperties,
    },
    {
        name: "Project card",
        className: "bg-[#10263f]",
        style: {
            "--foreground": "#faf7ef",
            color: "#faf7ef",
        } as CSSProperties,
    },
];

function EssayTagBadgeGallery() {
    return (
        <main className="min-h-screen bg-background px-6 py-10 text-foreground">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
                <header className="flex flex-col gap-2">
                    <h1 className="font-serif text-5xl font-bold tracking-tight">
                        Essay Tag Badge
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-foreground/60">
                        Compact tag badges across the essay and homepage
                        surfaces.
                    </p>
                </header>

                <div className="grid gap-4 md:grid-cols-2">
                    {surfaceSamples.map((surface) => (
                        <section
                            key={surface.name}
                            className={`${surface.className} flex min-h-36 flex-col justify-between rounded-lg border border-foreground/10 p-5 shadow-sm`}
                            style={surface.style}
                        >
                            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/55">
                                {surface.name}
                            </h2>

                            <div className="flex flex-wrap gap-1">
                                {sampleTags.map((tag) => (
                                    <EssayTagBadge key={tag} tag={tag} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}

const meta = {
    title: "Components/Essay Tag Badge",
    component: EssayTagBadge,
    args: {
        tag: "personal-experience",
    },
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EssayTagBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Backgrounds: Story = {
    render: () => <EssayTagBadgeGallery />,
};
