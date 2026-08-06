import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { StickyCta } from "@/components/layout/sticky-cta";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "1031 Exchange Seattle | Free Turnkey Exchange Help",
  description:
    "Free 1031 exchange guidance for Seattle property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing.",
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/favicon/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/favicon/android-chrome-512x512.png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',

  metadataBase: new URL("https://1031exchangeseattle.com"),

  alternates: { canonical: "/" },

  twitter: { card: "summary_large_image", title: "1031 Exchange Seattle | Free Turnkey Exchange Help", description: "Free 1031 exchange guidance for Seattle property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing.", images: ["/homepage-hero/seattle-washington-1031-exchange-1.jpg"] },

  openGraph: { title: "1031 Exchange Seattle | Free Turnkey Exchange Help", description: "Free 1031 exchange guidance for Seattle property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing.", images: ["/homepage-hero/seattle-washington-1031-exchange-1.jpg"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <div className="flex min-h-screen flex-col bg-white text-[#0B3C5D]">
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <StickyCta />
        <Analytics />
              <script src="/turnstile-contact.js" defer></script>
      </body>
    </html>
  );
}
