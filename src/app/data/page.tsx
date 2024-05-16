'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';

const Data = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const marketId = pathSegments.length > 2 ? pathSegments[2] : null;

    if (!marketId) {
      router.push('/data/CFSMrBssNG8Ud1edW59jNLnq2cwrQ9uY5cM3wXmqRJj3');
    }
  }, [pathname, router]);

  return (
    <>
      <GoogleAnalytics gaId="G-9PEVYHKFL5" />
    </>
  );
};

export default Data;
