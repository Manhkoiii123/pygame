import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#009DBE",
        completed: "#A9F5AB",
        processed: "#FFAC9F",
        started: "#FFD0A5",
      },
      textColor: {
        primary: "#111315",
        secondary: "#009DBE",
        ink300: "#272B30",
      },
    },
  },
  plugins: [],
};
export default config;
