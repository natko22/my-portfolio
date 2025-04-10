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

// ✅ Define metadata separately
export const metadata: Metadata = {
  title: "Chapters by Anastasia | Creative Web Developer Portfolio",
  description:
    "Anastasia Tsapanidou Kornilaki is a creative web developer blending code and design. Explore chapters of real-world work, solo projects, internships, and creative builds.",
  keywords: [
    "Chapters by Anastasia",
    "Anastasia Tsapanidou Kornilaki",
    "creative developer portfolio",
    "frontend developer",
    "web developer portfolio",
    "bootcamp projects",
    "internship work",
    "solo web projects",
    "creative coding",
    "Next.js portfolio",
    "fullstack developer",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Chapters by Anastasia | Creative Web Developer Portfolio",
    description:
      "Anastasia Tsapanidou Kornilaki is a full-stack web developer with a passion for creative coding and user-focused design. This portfolio showcases solo projects, internships, and real-world development experience.",
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
        type: "image/jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapters by Anastasia | Creative Web Developer Portfolio",
    description:
      "A portfolio by Anastasia Tsapanidou Kornilaki — full-stack web developer with experience in real-world projects, internships, and creative coding .",
    images: ["https://chaptersbyanastasia.dev/preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ✅ Export viewport separately
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
        {/* OG + Twitter Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaptersbyanastasia.dev" />
        <meta property="og:title" content="Turning Pages, Writing Code" />
        <meta
          property="og:description"
          content="Where logic meets creativity, a new world unfolds."
        />
        <meta
          property="og:image"
          content="https://chaptersbyanastasia.dev/preview.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Turning Pages, Writing Code – Portfolio by Anastasia"
        />

        {/*  Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Turning Pages, Writing Code" />
        <meta
          name="twitter:description"
          content="Where logic meets creativity, a new world unfolds."
        />
        <meta
          name="twitter:image"
          content="https://chaptersbyanastasia.dev/preview.jpg"
        />

        {/* Extra essentials */}
        <link rel="preload" href="/linear-bg.webp" as="image" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" />
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
