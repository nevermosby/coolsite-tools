import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Suspense } from "react";

import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import GoogleTagListener from "@/components/analytics/GoogleTagListener";
import {getMessages} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Utilities | Free Developer & Office Tools",
  description: "Free online tools: JSON formatter, image converter, password generator, word counter and more. All tools run locally in your browser.",
};

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID!;
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID!;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({locale});
  const navTranslations = messages.Nav as {home: string; about: string; ebpf: string};

  return (
    <html lang={locale}>
      <head>
        {/* Google AdSense - 使用原生 script 标签避免 Next.js 添加额外属性 */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />

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
        <NextIntlClientProvider messages={messages}>
          {/* GA 路由监听（必须在 body 中） */}
          <Suspense fallback={null}>
            <GoogleTagListener />
          </Suspense>

          <Header translations={navTranslations} />

          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>

          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
