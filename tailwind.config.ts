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
        coiny: ["Bagel Fat One", "system-ui"],
      },
      colors: {
        primary: "#07BCF5",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
