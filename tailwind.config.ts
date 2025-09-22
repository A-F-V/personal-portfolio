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
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                },
                card: {
                    DEFAULT: "var(--card)",
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
