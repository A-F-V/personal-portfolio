import type { Metadata, Viewport } from "next";
import {
    EB_Garamond,
    Instrument_Serif,
    Inter,
    Playfair_Display,
    Source_Serif_4,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const ebGaramond = EB_Garamond({
    subsets: ["latin"],
    variable: "--font-eb-garamond",
    weight: ["400", "600", "700"],
});

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair-display",
    weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    variable: "--font-instrument-serif",
    weight: ["400"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const sourceSerif4 = Source_Serif_4({
    subsets: ["latin"],
    variable: "--font-source-serif-4",
    weight: ["400", "600", "700"],
});

const fontVariables = [
    instrumentSerif.variable,
    playfairDisplay.variable,
    ebGaramond.variable,
    inter.variable,
    sourceSerif4.variable,
].join(" ");

export const baseMetadata: Metadata = {
    title: "Alessandro Farace",
    description: "Personal website of Alessandro Farace",
    icons: {
        icon: "/profile.jpg",
    },
};

export const homeViewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#02223f",
};

export const essayViewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#faf7ef",
};

type RootShellProps = {
    bodyClassName: string;
    children: React.ReactNode;
    htmlClassName: string;
};

export function RootShell({
    bodyClassName,
    children,
    htmlClassName,
}: RootShellProps) {
    return (
        <html lang="en" className={`${fontVariables} ${htmlClassName}`}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
                />
            </head>
            <body className={`font-sans antialiased ${bodyClassName}`}>
                {children}
                <Analytics />
                <GoogleAnalytics gaId="G-CQ57BSS24F" />
            </body>
        </html>
    );
}

export function createCanvasLayout(canvasClassName: string) {
    return function CanvasLayout({ children }: { children: React.ReactNode }) {
        // Multiple root layouts intentionally trigger a full document load when
        // crossing route groups. That tradeoff keeps iOS safe-area and overscroll
        // painting server-rendered on the actual html/body canvas instead of
        // relying on child selectors or client-side pathname mutation.
        // See: https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
        return (
            <RootShell
                htmlClassName={canvasClassName}
                bodyClassName={canvasClassName}
            >
                {children}
            </RootShell>
        );
    };
}
