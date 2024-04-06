import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';
import TopVaults from '@/components/Vaults/TopVaults';
import Vaults from '@/components/Vaults/Vaults';
import VaultsEndless from '@/components/Vaults/VaultsEndless';
import VaultsMobile from '@/components/Vaults/VaultsMobile';

export default function Home() {
  return (
    <main className='overflow-hidden'>
      <Header />
      <Vaults />
      <VaultsMobile />
      <TopVaults />
      <VaultsEndless />
      <Footer />
    </main>
  );
}