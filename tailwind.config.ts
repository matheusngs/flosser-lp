import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        flosser: {
          black: "#0a0a0a",
          surface: "#141414",
          surface2: "#1c1c1c",
          sage: "#9cae8a",
          "sage-dark": "#7e9470",
          "sage-light": "#b8c7a8",
          "sage-soft": "#3a4432",
          "sage-deep": "#1f2a1a",
          text: "#f5f5f0",
          muted: "#a8a8a0",
          soft: "#6b6b65",
          border: "#242424",
          cream: "#f5f5f0",
          "cream-2": "#ebebe4",
          beige: "#e8dcc4",
          "beige-soft": "#f0e6d2",
          "beige-deep": "#d9c9a8",
          ink: "#0a0a0a",
          "ink-muted": "#5a5a55",
          "ink-soft": "#8a8a82",
          "ink-border": "#e0e0d8",
        },
      },
      backgroundImage: {
        "gradient-dark":
          "linear-gradient(135deg, #0a0a0a 0%, #0f1410 45%, #1f2a1a 100%)",
        "gradient-dark-soft":
          "linear-gradient(180deg, #0a0a0a 0%, #121712 55%, #1f2a1a 100%)",
        "gradient-light":
          "linear-gradient(135deg, #f5f5f0 0%, #f0e6d2 60%, #e8dcc4 100%)",
        "gradient-light-soft":
          "linear-gradient(180deg, #f5f5f0 0%, #f0e6d2 55%, #e8dcc4 100%)",
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
      },
      letterSpacing: {
        "widest-x": "0.3em",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(2rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (u: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};

export default config;
