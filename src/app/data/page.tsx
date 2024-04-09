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
      router.push('/data/Gudvr1FPgxKfnMoEEBXDgXWzmoavTY7nGC9TcdM4s3SP');
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
