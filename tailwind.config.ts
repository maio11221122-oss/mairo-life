import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FDFBF7",
        surface: "#F5F0E8",
        primary: "#C9A89A",
        "primary-dark": "#A87D72",
        "text-main": "#3D3530",
        "text-sub": "#7A6B64",
        border: "#E8DDD4",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Noto Serif JP", "serif"],
        sans: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
