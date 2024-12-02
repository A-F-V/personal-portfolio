import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        midground: "var(--midground)",
        preground: "var(--preground)",
        foreground: "var(--foreground)",

        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--midground)",
        },

        secondary: "var(--secondary)",

        card: {
          DEFAULT: "var(--preground)",
          foreground: "var(--foreground)",
          border: "var(--foreground)",
        },

        border: "var(--foreground)",
      },
      fontSize: {
        "big-title": ["16rem", { lineHeight: "1" }],
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--main-font)", "sans-serif"],
        serif: ["var(--main-font)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },

      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
} satisfies Config;
