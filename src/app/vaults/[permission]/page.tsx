"use client";
import { useEffect } from "react";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import VaultDetailsBanner from "@/components/vaultpermissionless/VaultDetailsBanner";
import VaultPermissionless from "@/components/vaultpermissionless/VaultPermissionless";
import Technicals from "@/components/homepage/Technicals";
import TopVaults from "@/components/homepage/TopVaults";

const VaultPermissionlessDetailsPage = ({
  params,
}: {
  params: { permission: string };
}) => {
  const { permission } = params;

  useEffect(() => {
    document.title = `Arcana Vaults | ${permission}`;
  }, [permission]);

  return (
    <div className=" overflow-hidden relative">
      <div className=" sm:h-[486px] flex flex-col">
        <Navbar />
        <div className=" flex-grow flex justify-center w-full items-center">
          <VaultDetailsBanner params={params} />
        </div>
      </div>
      <VaultPermissionless params={params} />
      <Technicals />
      <TopVaults />
      <Footer />
    </div>
  );
};

export default VaultPermissionlessDetailsPage;
