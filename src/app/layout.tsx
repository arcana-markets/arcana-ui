import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from '@/components/Providers/Providers';

import "./globals.css";
import '@solana/wallet-adapter-react-ui/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arcana | Vaults",
  description: "Grow your yield using advanced MM strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`!bg-primary ${inter.className}`}>
      <Providers>{children}</Providers>
        </body>
    </html>
  );
}
