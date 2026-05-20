import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211f",
        muted: "#5f6f69",
        line: "#d8e2dd",
        paper: "#fbfdfc",
        mist: "#eef6f3",
        teal: "#0f766e",
        clay: "#b65f44",
        saffron: "#b98519",
        forest: "#23463f"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 33, 31, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
