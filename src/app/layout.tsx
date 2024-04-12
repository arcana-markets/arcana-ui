// import { Providers } from "@/contexts/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import '@solana/wallet-adapter-react-ui/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://arcana.markets'),
   title: "Arcana | Vaults",
   description: "Grow your yield using advanced aMMs.",
   keywords: ['DeFi', 'Crypto', 'Solana', 'Arcana', 'Arcana Markets', 'Finance', 'Decentralized Finance', 'Token Vaults', 'Crypto API', 'DeFi Data'],
   creator: 'Arcana Labs',
   twitter: {
    card: 'summary_large_image',
    title: 'Arcana Markets',
    description: 'DeFi Yield on Solana',
    siteId: '1619445807987699712',
    creator: '@arcanamarkets',
    creatorId: '1619445807987699712',
    images: [{
      url: 'https://i.ibb.co/SPC9fYs/twitter-image.png',
      alt: 'Arcana Markets X Image'
    }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`!bg-primary ${inter.className}`}>
      <body>
      <GoogleAnalytics gaId="G-9PEVYHKFL5" />
        {children}
        </body>
    </html>
  );
}
