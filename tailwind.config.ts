import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Homepage palette: warm ink, clean paper, deep Nigerian green
        ink: {
          DEFAULT: "#16140F",
          800: "#2A2620",
          600: "#57524A",
        },
        paper: {
          DEFAULT: "#FBFAF7",
          100: "#F3F1EC",
        },
        forest: {
          DEFAULT: "#0F3D2E",
          700: "#14503C",
          300: "#A8CDBB",
        },
        // Sovereign Obsidian (Deep High-Contrast Charcoal & Black)
        obsidian: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          700: "#2B2E35",
          800: "#1A1C22",
          900: "#0F1115",
          950: "#08090B",
        },
        // Radiant Architectural Gold (High Contrast & Legibility)
        gold: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D", // High-contrast radiant gold for dark backgrounds
          400: "#FBBF24", // Vibrant gold for buttons & active highlights
          500: "#F59E0B", // Primary gold
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        coral: {
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
