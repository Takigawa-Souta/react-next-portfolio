import "./globals.css";

import type { Metadata } from "next";
import Header from "./_components/Header"
import Footer from "./_components/Footer";
import ThemeToggle from "./_components/ThemeToggle";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    template: "%s | ポートフォリオサイト",
    default: "ポートフォリオサイト",
  },
  description: "個人のポートフォリオサイトです。ブログやプロジェクトを紹介しています。",
  openGraph: {
    title: "ポートフォリオサイト",
    description: "個人のポートフォリオサイトです。ブログやプロジェクトを紹介しています。",
    images: ["/ogp.png"],
  },
  alternates: {
    canonical: "http://localhost:3000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <ThemeToggle />
        {children}
        <Footer />
      </body>
    </html>
  );
}
