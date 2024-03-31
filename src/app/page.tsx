import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import TopVaults from "@/components/homepage/TopVaults";
import Vaults from "@/components/homepage/Vaults";
import VaultsEndless from "@/components/homepage/VaultsEndless";
import VaultsMobile from "@/components/homepage/VaultsMobile";

export default function Home() {
  return (
    <main className="overflow-hidden ">
      <Header />
      <Vaults />
      <VaultsMobile />
      <TopVaults />
      <VaultsEndless />
      <Footer />
    </main>
  );
}
