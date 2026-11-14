import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyAd from "@/components/StickyAd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lini Movie - Nonton Film, Serial TV & Anime Online Sub Indo",
    template: "%s | Lini Movie"
  },
  description: "Platform streaming film bioskop terbaru, serial televisi populer, dan anime pilihan dengan kualitas Full HD didukung oleh VidLink.",
  keywords: ["streaming film", "nonton movie", "serial tv", "anime sub indo", "vidlink", "lini movie"]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="33BlawfG3xDhnT7UCpEtCpl6QiAozHYErjhpydvyBSw"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-sky-500 selection:text-slate-950 font-sans antialiased pb-20 sm:pb-24">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        {/* Sticky banner iklan A-Ads menempel permanen di bagian bawah layar tanpa tombol close */}
        <StickyAd position="bottom" adUnitId="2462042" closable={false} />
      </body>
    </html>
  );
}
