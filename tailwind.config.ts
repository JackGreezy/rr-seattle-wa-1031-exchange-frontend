import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./data/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#111827",
        "brand-charcoal": "#1B1B1B",
        "brand-copper": "#0EA5A6",
        "brand-copper-light": "#0EA5A6",
        "brand-gold": "#0EA5A6",
        "brand-gold-dark": "#0EA5A6",
        "pnw-navy": "#1F3C58",
        "pnw-midnight": "#0E2536",
        "pnw-mist": "#F5F7FA",
        "pnw-cloud": "#E8EDEF",
        "pnw-teal": "#4DA49B",
        "pnw-ink": "#1B1B1B",
        "pnw-slate": "#3A4958",
        "pnw-soft-white": "#FBFCFE",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        "fog-lg": "0 30px 60px -25px rgba(17, 40, 60, 0.45)",
        "fog-md": "0 20px 45px -25px rgba(17, 40, 60, 0.35)",
      },
      maxWidth: {
        wrapper: "80rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
