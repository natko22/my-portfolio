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
  title: "Turning Pages, Writing Code | Portfolio",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  description:
    "Where logic meets creativity, a new world unfolds. Explore my portfolio of web development and creative coding projects.",
  keywords: [
    "web development",
    "portfolio",
    "creative coding",
    "frontend development",
  ],
  openGraph: {
    title: "Turning Pages, Writing Code",
    description: "Where logic meets creativity, a new world unfolds",
    type: "website",
    locale: "en_US",
    siteName: "Your Portfolio",
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
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" href="/linear-bg.webp" as="image" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 overflow-hidden ">
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
