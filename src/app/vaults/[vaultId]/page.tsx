"use client";

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import VaultDetailsBanner from "@/components/Permissionless/VaultDetailsBanner";
import VaultPermissionless from "@/components/Permissionless/VaultPermissionless";
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
            arcVault: "arcanum"
          }} />
        </div>
      </div>
      <VaultPermissionless params={{
            arcVault: "arcanum"
          }} />
      <Technicals />
      <TopVaults />
      <Footer />
    </div>
  );
};

export default Page;
