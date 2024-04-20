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
      router.push('/data/BU3EaRVo9WN44muCBy3mwkCQ4uYQWiuqay1whEmeSXK3');
    }
  }, [pathname, router]);

  return (
    <>
      <GoogleAnalytics gaId="G-9PEVYHKFL5" />
    </>
  );
};

export default Data;
