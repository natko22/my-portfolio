/* eslint-disable @typescript-eslint/no-require-imports */
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        book: {
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
          bg: "var(--color-background)",
          accent: "var(--color-accent)",
          "accent-light": "var(--color-accent-light)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)"],
        body: ["var(--font-lora)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
