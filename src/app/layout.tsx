import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Syne } from 'next/font/google';
import "./globals.css";
import { Provider } from "@/components/ui/provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-display',
});

const baseFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-default',
});

export const metadata: Metadata = {
  title: "GOAT Boots",
  description: "Calzado industrial de alta calidad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="es_ES">
      <body className={`${baseFont.variable} ${displayFont.variable} scroll-smooth`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html >
  );
}
