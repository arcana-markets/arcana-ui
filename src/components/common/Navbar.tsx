"use client";

import { NavIcon, NavMenu } from "@/components/common/Icons";
import { MdClose } from "react-icons/md";
import ModalCustom from "./ModalCustom";
import { usePriorityFee } from '../../hooks/usePriorityFee';
import { Explorers, useExplorerConfiguration } from '@/hooks/useExplorerConfiguration';
import { shortKey } from '@/utils/utils';
import { Networks, useNetworkConfiguration } from '../../hooks/useNetworkConfiguration';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import numeral from 'numeral';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import {
  IconBooks,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTwitter,
  IconSun,
  IconMoonStars,
  IconExternalLink,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import Button from '@/components/common/forms/Button';
import Select from '@/components/common/forms/Select';
import Input from '@/components/common/forms/Input';
import ButtonGroup from '@/components/common/forms/ButtonGroup';
import { RedirectIcon } from "@/common/Icons";

const networks = [
  { label: 'Mainnet', value: Networks.Mainnet.toString() },
  { label: 'Devnet', value: Networks.Devnet.toString() },
  { label: 'Localnet', value: Networks.Localnet.toString() },
  { label: 'Custom', value: Networks.Custom.toString() },
];

const explorers = [
  { label: 'Solana.fm', value: Explorers.SolanaFM.toString() },
  { label: 'Solscan', value: Explorers.Solscan.toString() },
  { label: 'X-Ray', value: Explorers.Xray.toString() },
  { label: 'Solana Explorer', value: Explorers.Solana.toString() },
];

function getTokenPrice(data: any) {
  const price = Math.round((Number(data.outAmount) / Number(data.inAmount)) * 1000000) / 1000;
  return price;
}

function useTokenPrice() {
  const url =
    'https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&' +
    'outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&' +
    'amount=100000000&' +
    'slippageBps=50&' +
    'swapMode=ExactIn&' +
    'onlyDirectRoutes=false&' +
    'maxAccounts=64&' +
    'experimentalDexes=Jupiter%20LO';
  const tokenPriceFetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => getTokenPrice(data));
  const { data, error, isLoading } = useSWR('wsolSpotPrice', tokenPriceFetcher);

  return {
    price: data,
    isLoading,
    isError: error,
  };
}

const Navbar = () => {
  const [myModal, setMyModal] = useState(false)
  const [show, setShow] = useState(false);
  const wallet = useWallet();
  const modal = useWalletModal();
  const { network, endpoint, setNetwork, setCustomEndpoint } = useNetworkConfiguration();
  const { explorer, setExplorer } = useExplorerConfiguration();
  const logoRef = useRef(null);
  const { priorityFee, setPriorityFee } = usePriorityFee();
  const [solPrice, setSolPrice] = useState<number>();

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
  }, []); // Empty dependency array means this effect will only run once
  const tokenPrice = useTokenPrice();

  const feesCost = (((priorityFee / 100000) * 200000) / LAMPORTS_PER_SOL) * (solPrice || 0);

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);
  useEffect(() => {
    if (myModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [modal]);

  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <nav className={`w-full py-6 sm:py-10 z-[11] relative`}>
      <div className="flex container  px-4 mx-auto justify-between items-center">
        <div className=" flex gap-12">
          <Link href="/" className="mr-4">
            <NavIcon />
          </Link>
          <div
            className={`transition-all duration-300 ${show ? "!left-0" : ""
              } max-[1024px]:flex-col justify-center items-center gap-5 max-[1024px]:fixed max-[1024px]:w-full max-[1024px]:h-screen h-screen min-[1024px]:h-auto top-0 left-[-100%] max-[1024px]:bg-primary backdrop-blur-3xl max-lg:z-50 flex min-[1024px]:flex min-[1024px]:static`}
          >
            <ul className="flex items-center gap-6 sm:gap-10 min-[1024px]:flex-row flex-col">
              <Link href="/">
                <li className="nav-link">
                  Vaults
                </li>
              </Link>
              <Link href="/swap">
                <li className=" nav-link">
                  Swap
                </li>
              </Link>
              <Link href="/">
                <li className="nav-link ">
                  Markets
                </li>
              </Link>
              <a href="https://github.com/arcana-markets/arcana-trading-bot" target="_blank" rel="noopener noreferrer" className="nav-link flex items-center gap-2">
                  <span>Tools</span>
                  <RedirectIcon />
                </a>
                <a href="https://github.com/arcana-markets/docs" target="_blank" rel="noopener noreferrer" className="nav-link flex items-center gap-2">
                  <span>Docs</span>
                  <RedirectIcon />
                </a>
            </ul>
          </div>
        </div>

        <div className="flex gap-5">

          <div className="text-white z-30 cursor-pointer" onClick={() => setMyModal(!myModal)}>
            {myModal === true ? <MdClose size={24} /> : <button className="text-foxflowerviola sm:text-white text-sm sm:text-base font-medium sm:py-[10px] p-3 sm:px-4 rounded-xl bg-[#013746] sm:bg-[#252B32] Connect_btn transition-all duration-300 ease-linear">
              Connect <span className="max-sm:hidden">Wallet</span>
            </button>}
          </div>

          <button
            className={`${myModal === true ? "hidden" : "block"} z-50 relative min-[1024px]:hidden bg-[#013746] rounded-lg text-white h-12 w-12 flex items-center justify-center`}
            onClick={toggleMenu}
          >
            {show ? <MdClose size={24} /> : <NavMenu />}
          </button>

        </div>
      </div>
      <div className={` ${myModal === true ? "block" : "hidden"} fixed w-full left-0 top-0`}>
        <ModalCustom />
      </div>
    </nav>
  );
};

export default Navbar;
