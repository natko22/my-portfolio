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
    screens: {
      xxxs: "320px", // Ultra small screens
      xxs: "375px",
      sm: "640px", // Small screens (large mobile/small tablet)
      md: "768px", // Medium screens (tablets)
      lg: "1024px", // Large screens (laptops)
      xl: "1280px", // Extra large screens (desktops)
      "2xl": "1536px", // 2X large screens (large desktops)
    },
    extend: {
      screens: {
        mobile: { max: "740px" },
      },
      height: {
        "book-xxxs": "30vh",
        "book-xxs": "35vh",
        "book-sm": "40vh",
        "book-md": "45vh",
        "book-lg": "50vh",
        "book-xl": "55vh",
        "book-2xl": "60vh",
      },
      maxHeight: {
        "book-xxxs": "30vh",
        "book-xxs": "35vh",
        "book-sm": "40vh",
        "book-md": "45vh",
        "book-lg": "50vh",
        "book-xl": "55vh",
        "book-2xl": "60vh",
      },

      colors: {
        book: {
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
          bg: "var(--color-background)",
          accent: "var(--color-accent)",
          "accent-light": "var(--color-accent-light)",
          "book-paper": "#f5f3e9",
          "book-dark": "var(--color-primary-dark)",
          "book-light": "var(--color-primary-light)",
          "book-accent": "var(--color-accent)",
          "book-accent-light": "var(--color-accent-light)",
          "book-muted": "#6b7280",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)"],
        body: ["var(--font-lora)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwind-scrollbar")],

  variants: {
    scrollbar: ["rounded"],
  },
};
