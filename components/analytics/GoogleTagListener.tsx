'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID!;

export default function GoogleTagListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;

    const url =
      pathname + (searchParams?.toString() ? `?${searchParams}` : '');

    window.gtag('event', 'page_view', {
      page_path: url,
      send_to: GTAG_ID,
    });
  }, [pathname, searchParams]);

  return null;
}
