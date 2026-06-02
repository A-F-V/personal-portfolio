import type { Preview } from "@storybook/nextjs";
import type { CSSProperties } from "react";

import "../src/app/globals.css";

const preview: Preview = {
    decorators: [
        (Story) => (
            <div
                className="light-mode min-h-screen bg-background text-foreground antialiased"
                style={
                    {
                        "--font-inter":
                            "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                        "--font-instrument-serif": "Georgia, serif",
                        "--font-playfair-display": "Georgia, serif",
                        "--font-eb-garamond": "Georgia, serif",
                        "--font-source-serif-4": "Georgia, serif",
                    } as CSSProperties
                }
            >
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: "fullscreen",
    },
};

export default preview;
