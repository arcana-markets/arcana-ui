import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Suspense, lazy } from 'react';
import '@/app/data/css/styles.css';
import '@/app/data/css/marketDepth.css';

const inter = Inter({ subsets: ['latin'] });
const Loading = lazy(() => import('@/components/marketData/Loading'));

export const metadata: Metadata = {
    metadataBase: new URL('https://arcana.markets'),
    title: 'Arcana | Data',
    description: 'DeFi Liquidity on Solana',
     keywords: ['DeFi', 'Crypto', 'Solana', 'Arcana', 'Arcana Markets', 'Finance', 'Decentralized Finance', 'Token Vaults', 'Crypto API', 'DeFi Data'],
     creator: 'Arcana Labs',
     twitter: {
      card: 'summary_large_image',
      title: 'Arcana Markets',
      description: 'DeFi Liquidity on Solana',
      siteId: '1619445807987699712',
      creator: '@arcanamarkets',
      creatorId: '1619445807987699712',
      images: [{
        url: 'https://i.ibb.co/SPC9fYs/twitter-image.png',
        alt: 'Arcana Markets X Image'
      }],
    },
  };
  
  export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
    // Optional: Dynamically set page metadata
    // usePageMetadata(metadata);    
    return (
      <div className={`dark:bg-black-gradient bg-[#012A36] ${inter.className}`}>
      <Suspense fallback={<div><Loading/></div>}>
        <GoogleAnalytics gaId="G-9PEVYHKFL5" />
        <div className="dark:bg-black-gradient bg-[#012A36]">
          {children}
        </div>
      </Suspense>
      </div>
    );
  };
  