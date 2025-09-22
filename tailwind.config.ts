import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            animation: {
                "spin-slow": "spin 3s linear infinite",
            },
            colors: {
                border: "#264066",
                input: "#0f1d35",
                ring: "#2d628b",
                background: "#02223f",
                foreground: "#faf7ef",
                primary: {
                    DEFAULT: "#2d628b",
                    foreground: "#f6efe0",
                },
                secondary: {
                    DEFAULT: "#183159",
                    foreground: "#f6efe0",
                },
                destructive: {
                    DEFAULT: "#eb5c76",
                    foreground: "#030b18",
                },
                muted: {
                    DEFAULT: "#10263f",
                    foreground: "#cbd5e1",
                },
                accent: {
                    DEFAULT: "#faf7ef",
                },
                popover: {
                    DEFAULT: "#10263f",
                    foreground: "#faf7ef",
                },
                card: {
                    DEFAULT: "#10263f",
                },
            },
            fontSize: {
                "big-title": [
                    "16rem",
                    {
                        lineHeight: "1",
                    },
                ],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                serif: [
                    "var(--font-instrument-serif)",
                    "var(--font-playfair-display)",
                    "var(--font-eb-garamond)",
                    "Georgia",
                    "serif",
                ],
                accent: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            minWidth: {
                prose: "55ch",
            },
            maxWidth: {
                prose: "55ch",
            },
            letterSpacing: {
                "extra-wide": "0.15em",
                "super-wide": "0.25em",
            },
        },
    },
    plugins: [animate],
};

export default config;
