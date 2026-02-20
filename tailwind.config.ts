import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        eagle: {
          orange: "#FF8C00",
          "orange-light": "#FFA500",
          "orange-dark": "#e07a00",
          accent: "#2596be",
          "accent-light": "#3ba8d0",
          "accent-dark": "#1e7a9c",
          money: "#4ade80",
          "money-light": "#6ee7b7",
          "money-dark": "#10b981",
        },
        dark: {
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#333333",
          800: "#1a1a1a",
          900: "#111111",
          950: "#000000",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-lg": ["6rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display": ["4.5rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-sm": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "headline": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "title": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      maxWidth: {
        "8xl": "80rem",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
