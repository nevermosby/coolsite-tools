"use client";

import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { Wrench, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavTranslations = {
  home: string;
  about: string;
  ebpf: string;
};

export function Header({translations}: {translations: NavTranslations}) {
  const router = useRouter();
  const pathname = usePathname();

  const locale = pathname?.split('/')[1] || 'zh';

  const changeLocale = (newLocale: string) => {
    const newPath = pathname?.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href={`/${locale}/`} className="mr-6 flex items-center space-x-2">
            <Wrench className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              实用工具箱
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href={`/${locale}/about`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {translations.about}
            </Link>
            <a
              href="https://kernelreload.club/wordpress/ebpf%e5%ad%a6%e4%b9%a0%e6%95%99%e7%a8%8b"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {translations.ebpf}
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={locale === 'zh' ? "secondary" : "ghost"}
              size="sm"
              onClick={() => changeLocale('zh')}
              className="w-14"
            >
              中文
            </Button>
            <Button
              variant={locale === 'en' ? "secondary" : "ghost"}
              size="sm"
              onClick={() => changeLocale('en')}
              className="w-14"
            >
              EN
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}