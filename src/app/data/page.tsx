'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';

const Data = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const marketId = pathSegments[2];

    if (!marketId) {
      router.push('/data/CFSMrBssNG8Ud1edW59jNLnq2cwrQ9uY5cM3wXmqRJj3');
    }
  }, [pathname, router]);

  return (
    <>
      <GoogleAnalytics gaId="G-9PEVYHKFL5" />
      {/* Additional UI components or content can go here */}
    </>
  );
};

export default Data;
