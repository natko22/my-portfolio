import { Playfair_Display, Lora } from "next/font/google";
import "./styles/globals.css";

// Configure the Playfair Display font
const playfair = Playfair_Display({
  subsets: ["latin"],
  // Load multiple weights
  weight: ["400", "600", "700"],
  // This tells Next.js to swap in the font as soon as it loads to prevent layout shift
  display: "swap",
  // Create a CSS variable name
  variable: "--font-playfair",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
