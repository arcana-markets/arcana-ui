'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Networks, useNetworkConfiguration } from '@/hooks/useNetworkConfiguration';
import { Explorers, useExplorerConfiguration } from '@/hooks/useExplorerConfiguration';
import { usePriorityFee } from '@/hooks/usePriorityFee';
import { Menu } from '@headlessui/react';
import { shortKey } from '@/utils/utils';
import { DownIcon, NavIcon, NavMenu } from '@/components/Shared/Icons';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import * as Icons from '@/app/data/svg/Icons';
import { MdClose } from "react-icons/md";
import { NUMERAL_FORMAT } from '@/utils/constants';

import Link from 'next/link';
import Dropdown from './DropDown';
import useUserSOLBalanceStore from '@/stores/useUserSOLBalanceStore';
import { RequestAirdrop } from './RequestAirdrop';

const networks = [
  { label: 'Devnet', value: Networks.Devnet.toString() },
  { label: 'Localnet', value: Networks.Localnet.toString() },
];

const explorers = [
  { label: 'Solscan', value: Explorers.Solscan.toString() },
  { label: 'Solana Explorer', value: Explorers.Solana.toString() },
];

const Navbar = () => {
  const wallet = useWallet();
  const modal = useWalletModal();
  const [modal2, setmodal] = useState(false)
  const { network, endpoint, setNetwork, setCustomEndpoint } = useNetworkConfiguration();
  // const { explorer, setExplorer } = useExplorerConfiguration();
  // const { priorityFee, setPriorityFee } = usePriorityFee();
  const [solPrice, setSolPrice] = useState<number>();
    const { connection } = useConnection();

    const balance = useUserSOLBalanceStore((s) => s.balance)
    const { getUserSOLBalance } = useUserSOLBalanceStore()
    const [show, setShow] = useState(false);

    useEffect(() => {
      if (show) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }, [show]);
    useEffect(() => {
      if (modal2) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }, [modal2]);
  
    const toggleMenu = () => {
      setShow(!show);
    };

    useEffect(() => {
      if (wallet.publicKey && wallet.connected) {
        console.log(wallet.publicKey.toBase58());
        getUserSOLBalance(wallet.publicKey, connection);
      } else if (!wallet.connected) {
        // Resetting the balance when the wallet disconnects
        useUserSOLBalanceStore.getState().resetBalance();
      }
    }, [wallet.publicKey, wallet.connected, connection, getUserSOLBalance]);
    
  useEffect(() => {
    if (!wallet.connected && wallet.wallet) wallet.connect();
  }, [wallet]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
        );
        const data = await res.json();

        if (data?.solana?.usd) {
          setSolPrice(data.solana.usd);
        } else {
          setSolPrice(0);
        }
      } catch {
        setSolPrice(0);
      }
    };
    // Call fetchData immediately when component mounts
    fetchData();
  }, []);

  // const feesCost = (((priorityFee / 100000) * 200000) / LAMPORTS_PER_SOL) * (solPrice || 0);

  return (
    <nav className={`w-full py-6 sm:py-10 z-[11] relative`}>
      <div className="flex container px-4 mx-auto justify-between items-center">
        <div className=" flex gap-12">
          <Link href='/' className='mr-4'>
            <NavIcon />
          </Link>
          <div
            className={`transition-all duration-300 ${show ? "!left-0" : ""
              } max-[1024px]:flex-col justify-center items-center gap-5 max-[1024px]:fixed max-[1024px]:w-full max-[1024px]:h-screen h-screen min-[1024px]:h-auto top-0 left-[-100%] max-[1024px]:bg-primary backdrop-blur-3xl max-lg:z-50 flex min-[1024px]:flex min-[1024px]:static`}
          >
            <ul className="flex items-center gap-6 sm:gap-10 min-[1024px]:flex-row flex-col">
            <Link href='/'>
              <div className="nav-link flex items-center relative">
                Vaults
              </div>
            </Link>
              <Link href='/swap'>
              <div className="nav-link flex items-center relative">
              Swap
              </div>
              </Link>
              <Link href='/data'>
                <div className='nav-link '>
                  Markets
                  <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-markergreen text-white opacity-70 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Live
              </span>
              </div>
              </Link>
              <a href="https://github.com/arcana-markets/arcana-trading-bot" target="_blank" rel="noopener noreferrer" className="nav-link flex items-center gap-2">
                  <span>Tools</span>
                  <Icons.RedirectIcon />
                </a>
                <a href="https://github.com/arcana-markets/docs" target="_blank" rel="noopener noreferrer" className="nav-link flex items-center gap-2">
                  <span>Docs</span>
                  <Icons.RedirectIcon />
                </a>
            </ul>
          </div>
        </div>
        <div className='flex items-center'>
        <div className='hidden md:flex text-foxflowerviola gap-4 mr-4 items-center'>
          <Dropdown
            value={network}
            options={networks}
            onSelect={(selectedValue) => setNetwork(selectedValue as Networks)}
          />
          {network === Networks.Custom && (
            <input
              type="text"
              placeholder="Your custom RPC URL"
              onChange={(e) => setCustomEndpoint(e.target.value)}
              defaultValue={endpoint}
              className="mt-4" 
            />
          )}
        </div>
        <div className="flex gap-5">

        {wallet?.publicKey ? (
            <Menu as="div" className="relative inline-block text-left text-foxflowerviola z-30 cursor-pointer p-3">
              <Menu.Button className="flex items-center justify-between text-foxflowerviola sm:text-white text-sm sm:text-base font-medium p-3 rounded-xl bg-[#013746] sm:bg-[#252B32] Connect_btn transition-all duration-300 ease-linear">
                {wallet?.publicKey ? (
                  <>
                    <span>{shortKey(wallet.publicKey)}</span>
                    <DownIcon />
                  </>
                ) : (
                  'Connect Wallet'
                )}
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-[#013746] hover:bg-[#252B32] rounded-xl p-1">
                <div className="py-1">
                  {wallet && (
                    <div className="flex flex-col p-2">
                      <Menu.Item>
                          <RequestAirdrop />
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div className={`${active ? 'bg-[#252B32]' : ''} rounded-md p-2 flex`}>
                            <Image src="/tokens/SOL.png" alt="Solana Logo" width={24} height={24} />
                            <span className="text-white pl-2">{(balance || 0).toLocaleString()} SOL (Devnet)</span>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-[#252B32]" : "text-white"
                          } rounded-md p-2 flex items-center justify-between w-full text-sm`}
                          onClick={() => wallet.disconnect()}
                        >
                          Disconnect
                        </button>
                      )}
                    </Menu.Item>
                    </div>
                  )}
                </div>
              </Menu.Items>
            </Menu>
          ) : (
            <div className="flex gap-5">
            <div className="text-white z-30 cursor-pointer p-3">
            <button
                onClick={() => modal.setVisible(true)}
                disabled={modal.visible || wallet.connecting}
                className={`text-foxflowerviola sm:text-white text-sm sm:text-base font-medium sm:py-[10px] p-3 sm:px-4 rounded-xl bg-[#013746] sm:bg-[#252B32] Connect_btn transition-all duration-300 ease-linear ${
                  (modal.visible || wallet.connecting) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
              {modal.visible || wallet.connecting ? (
                'Loading...'
              ) : (
                <>
                  Connect <span className="sm:inline hidden">Wallet</span>
                </>
              )}
            </button>
            </div>
            <button
            className={`${modal.visible === true ? "hidden" : "block"} z-50 mt-2.5 -ml-4 relative min-[1024px]:hidden bg-[#013746] rounded-lg text-white h-12 w-12 flex items-center justify-center`}
            onClick={toggleMenu}
          >
            {show ? <MdClose size={24} /> : <NavMenu />}
          </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;