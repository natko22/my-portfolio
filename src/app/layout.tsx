import { Playfair_Display, Lora } from "next/font/google";
import "./styles/globals.css";
import type { Metadata } from "next";

// Configure fonts with optimized loading strategies
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap", // Prevents layout shift during font loading
  variable: "--font-playfair", // CSS variable for consistent font usage
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
});

// Define comprehensive metadata for better SEO and social sharing
export const metadata: Metadata = {
  title: "Turning Pages, Writing Code | Portfolio",
  description:
    "Where logic meets creativity, a new world unfolds. Explore my portfolio of web development and creative coding projects.",
  keywords: [
    "web development",
    "portfolio",
    "creative coding",
    "frontend development",
  ],
  // OpenGraph metadata improves how your site appears when shared on social media
  openGraph: {
    title: "Turning Pages, Writing Code",
    description: "Where logic meets creativity, a new world unfolds",
    type: "website",
    locale: "en_US",
    siteName: "Your Portfolio",
  },
  // Robot directives control how search engines interact with your site
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Allow following links to discover other pages
  },
  // Ensure proper mobile rendering
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} overflow-hidden`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Preload critical assets for faster initial load */}
        <link rel="preload" href="/linear-bg.webp" as="image" />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900">
        {/* Accessibility skip link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
        >
          Skip to main content
        </a>

        {/* Main content wrapper with proper landmark */}
        <main id="main-content" className={`min-h-screen`}>
          {children}
        </main>

        {/* Optional: Add analytics or other scripts here */}
      </body>
    </html>
  );
}
