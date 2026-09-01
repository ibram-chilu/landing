import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        synq: {
          navy: "#102A43",
          teal: "#0F766E",
          mint: "#DDF3EF",
          cream: "#FFF9EE",
          coral: "#EF6A67",
          mustard: "#D8A229",
          white: "#FFFFFF",
          ink: "#17212B",
        },
      },
      boxShadow: {
        soft: "0 18px 40px -24px rgba(16, 42, 67, 0.45)",
        card: "0 14px 30px -22px rgba(16, 42, 67, 0.35)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(15, 118, 110, 0.24), transparent 40%), radial-gradient(circle at bottom right, rgba(216, 162, 41, 0.14), transparent 32%)",
      },
      fontFamily: {
        sans: ["Aptos", "Segoe UI", "sans-serif"],
        display: ["Bahnschrift", "Trebuchet MS", "sans-serif"],
      },
      keyframes: {
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "float-gentle": "float-gentle 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
