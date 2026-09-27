import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { AppLayoutClient } from "@/components/AppLayoutClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  variable: "--font-source-sans"
});

export const metadata: Metadata = {
  title: "Adaptive Academic Companion",
  description: "Your personalized study and peer collaboration platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${sourceSans.variable}`}>
        <AppLayoutClient>
          {children}
        </AppLayoutClient>
      </body>
    </html>
  );
}

