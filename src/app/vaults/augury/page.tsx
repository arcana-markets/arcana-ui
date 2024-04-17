"use client";

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import VaultDetailsBanner from "@/components/Vaults/Permissionless/VaultDetailsBanner";
import VaultPermissionless from "@/components/Vaults/Permissionless/VaultPermissionless";
import Technicals from "@/components/Vaults/Technicals";
import TopVaults from "@/components/Vaults/TopVaults";

const Page = () => {

  useEffect(() => {
    document.title = `Arcana | Vaults `;
  }, []);

  return (
    <div className=" overflow-hidden relative">
      <GoogleAnalytics gaId="G-9PEVYHKFL5" />
      <div className=" sm:h-[486px] flex flex-col">
        <Navbar />
        <div className=" flex-grow flex justify-center w-full items-center">
          <VaultDetailsBanner params={{
            arcVault: "augury"
          }} />
        </div>
      </div>
      <VaultPermissionless params={{
            arcVault: "augury"
          }} />
      <Technicals />
      <TopVaults />
      <Footer />
    </div>
  );
};

export default Page;
