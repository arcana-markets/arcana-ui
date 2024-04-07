'use client'

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';

const Vaults = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const marketId = pathSegments.length > 2 ? pathSegments[2] : null;

    if (!marketId) {
      router.replace('/vaults/DqnVLdkSZti24hho93iUipSG7GQYnFrYR7ABwQnjPQZ8');
    }
  }, [pathname, router]);

  return <GoogleAnalytics gaId="G-9PEVYHKFL5" />;
};

export default Vaults;
