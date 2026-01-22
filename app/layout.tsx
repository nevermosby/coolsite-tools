import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import GoogleTagListener from "@/components/analytics/GoogleTagListener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "在线实用工具箱 | Online Utilities",
  description:
    "免费在线工具集合：JSON格式化, 图片转换, 密码生成, 字数统计等。Free online tools including JSON formatter, image converter, password generator.",
};

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID!;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GTAG_ID}', {
              send_page_view: false
            });
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        {/* GA 路由监听（必须在 body 中） */}
        <GoogleTagListener />

        <Header />

        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
