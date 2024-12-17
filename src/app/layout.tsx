import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Alessandro Farace",
  description: "Personal website of Alessandro Farace",
  icons: {
    icon: "/profile.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-background`}
      >
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-CQ57BSS24F" />
      </body>
    </html>
  );
}
