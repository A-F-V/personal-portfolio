import type { Metadata } from "next";
import "./globals.css";
import {
    EB_Garamond,
    Instrument_Serif,
    Inter,
    Playfair_Display,
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

export const metadata: Metadata = {
    title: "Alessandro Farace",
    description: "Personal website of Alessandro Farace",
    icons: {
        icon: "/profile.jpg",
    },
};

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="en"
            className={`${instrumentSerif.variable} ${playfairDisplay.variable} ${ebGaramond.variable} ${inter.variable}`}
        >
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
                />
            </head>
            <body
                className={`${inter.className} font-sans antialiased bg-no-repeat`}
            >
                {children}
                <Analytics />
                <GoogleAnalytics gaId="G-CQ57BSS24F" />
            </body>
        </html>
    );
}
