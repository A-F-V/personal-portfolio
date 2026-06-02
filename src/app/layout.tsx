import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
    EB_Garamond,
    Instrument_Serif,
    Inter,
    Playfair_Display,
    Source_Serif_4,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
    createSiteUrl,
    getSiteUrl,
    RSS_FEED_PATH,
    SITE_DESCRIPTION,
    SITE_NAME,
} from "@/lib/site";

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

export const metadata: Metadata = {
    metadataBase: new URL(getSiteUrl()),
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    alternates: {
        types: {
            "application/rss+xml": createSiteUrl(RSS_FEED_PATH),
        },
    },
    icons: {
        icon: "/profile.jpg",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="en"
            className={`${instrumentSerif.variable} ${playfairDisplay.variable} ${ebGaramond.variable} ${inter.variable} ${sourceSerif4.variable}`}
        >
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
                />
            </head>
            <body className={`font-sans antialiased bg-no-repeat`}>
                {children}
                <Analytics />
                <GoogleAnalytics gaId="G-CQ57BSS24F" />
            </body>
        </html>
    );
}
