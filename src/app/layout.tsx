import { Providers } from "@/contexts/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@solana/wallet-adapter-react-ui/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arcana Vaults | Home",
  description: "Grow your yield using advanced aMMs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`!bg-primary ${inter.className}`}>
      <body>
        <Providers>{children}</Providers>
        </body>
    </html>
  );
}
