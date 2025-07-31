import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://honestfarming.com'),
  title: "Honest Farming - Technology for Human Growth",
  description: "Cultivating cooperation with the divine Logos. Truth-driven solutions for authentic communities and transparent systems.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
  },
  openGraph: {
    title: "Honest Farming - Technology for Human Growth",
    description: "Cultivating cooperation with the divine Logos. Truth-driven solutions for authentic communities and transparent systems.",
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Honest Farming Logo',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Honest Farming - Technology for Human Growth",
    description: "Cultivating cooperation with the divine Logos. Truth-driven solutions for authentic communities and transparent systems.",
    images: ['/icons/icon-512x512.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HonestFarming",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
