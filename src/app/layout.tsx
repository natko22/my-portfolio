import { Playfair_Display, Lora } from "next/font/google";
import "./styles/globals.css";
import type { Metadata, Viewport } from "next";

// Configure fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
});

// ✅ Define metadata
export const metadata: Metadata = {
  title: "Chapters by Anastasia | Lines of Code, Chapters of Creativity",
  description:
    "Anastasia Tsapanidou Kornilaki (Αναστασία Τσαπανίδου Κορνηλάκη) is a creative web developer showcasing real-world projects, solo builds, and internship experiences.",
  keywords: [
    "Anastasia Tsapanidou Kornilaki",
    "Αναστασία Τσαπανίδου Κορνηλάκη",
    "Natassa Kornilaki",
    "Νατάσσα Κορνηλάκη",
    "Berlin web developer",
    "fullstack developer",
    "Chapters by Anastasia",
    "creative developer portfolio",
    "frontend developer",
    "web developer portfolio",
    "bootcamp projects",
    "internship work",
    "solo web projects",
    "creative coding",
    "Next.js portfolio",
    "fullstack developer",
    "lines of code",
    "chapters of creativity",
    "Greek web developer Berlin",
    "Ελληνίδα προγραμματίστρια Βερολίνο",
  ],
  authors: [
    {
      name: "Anastasia Tsapanidou Kornilaki (Αναστασία Τσαπανίδου Κορνηλάκη)",
      url: "https://chaptersbyanastasia.dev",
    },
  ],
  creator: "Anastasia Tsapanidou Kornilaki (Αναστασία Τσαπανίδου Κορνηλάκη)",
  publisher: "Anastasia Tsapanidou Kornilaki",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Chapters by Anastasia | Lines of Code, Chapters of Creativity",
    description:
      "Anastasia Tsapanidou Kornilaki, a creative web developer showcasing real-world projects, solo builds, and internship experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Chapters by Anastasia",
    url: "https://chaptersbyanastasia.dev",
    images: [
      {
        url: "https://chaptersbyanastasia.dev/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Anastasia Tsapanidou Kornilaki – Full-Stack Web Developer Portfolio Preview",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapters by Anastasia | Lines of Code, Chapters of Creativity",
    description:
      "Anastasia Tsapanidou Kornilaki (Αναστασία Τσαπανίδου Κορνηλάκη), a creative web developer showcasing real-world projects, solo builds, and internship experiences.",
    images: ["https://chaptersbyanastasia.dev/preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <head>
        <link rel="preload" href="/linear-bg.webp" as="image" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" />
        {/* Additional meta tag for name in both languages */}
        <meta
          name="author"
          content="Anastasia Tsapanidou Kornilaki (Αναστασία Τσαπανίδου Κορνηλάκη)"
        />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 overflow-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
        >
          Skip to main content
        </a>
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                setTimeout(function() {
                  const buttons = document.querySelectorAll('button');
                  buttons.forEach(btn => {
                    btn.style.visibility = 'visible';
                    btn.style.opacity = '1';
                  });
                }, 100);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
