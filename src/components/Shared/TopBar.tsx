'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import { Menu } from '@headlessui/react';
// import { shortKey } from '@/utils/utils';
import ComponentWrapper from '@/components/Shared/ComponentWrapper';
import * as Icons from '@/app/data/svg/Icons';
import Tooltip from './Tooltip';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const TopBar = () => {
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [width] = useWindowSize();
  const isMobile = width <= 768;
  const wallet = useWallet();
  const { setVisible } = useWalletModal();

  const handleWalletButtonClick = () => {
    if (wallet?.publicKey) {
      wallet.disconnect();
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);
  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [modal]);

  return (
    <nav className={`w-full py-6 sm:py-10 z-[11] relative`}>
      <ComponentWrapper>
        <div className="flex container px-4 mx-auto justify-between items-center">
          <div className="flex gap-12">
            <a href="/" className="mr-4">
              <Icons.logo ClassName='w-[120px] sm:w-[140px] h-[100px] sm:h-[140px]' />
            </a>
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
                  <li className="nav-link">
                    Swap
                  </li>
                </Link>
                <Link href="/data">
                  <li className="nav-link ">
                    Markets
                  </li>
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
          <div className="flex gap-5">
            {/* Additional content here */}
          </div>
        </div>
        <div className={` ${modal === true ? "block" : "hidden"} fixed w-full left-0 top-0`}>
          {/* Modal content here */}
        </div>
      </ComponentWrapper>
    </nav>
  );
};
        {/* Your navigation links here */}
        {/*
        <div className='flex gap-10 justify-center items-center'>
          {wallet?.publicKey ? (
            <Menu as="div" className="relative">
              <Menu.Button 
                className="inline-flex justify-center w-full h-[44px] rounded-md border border-transparent shadow-sm px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5099CC] focus:border-[#5099CC]"
                style={{ 
                  padding: '10px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  marginRight: '20px',
                  alignItems: 'center',
                  fontSize: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#5099CC',
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  height: '44px',
                  width: 'auto',
                }}
              >
                {shortKey(wallet.publicKey)}
              </Menu.Button>
              <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Button
                        onClick={handleWalletButtonClick}
                        className={`${active ? 'bg-[#5099CC] text-white' : 'text-white'} block px-4 py-2 text-sm`}
                      >
                        Disconnect
                      </Button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          ) : (
            !isMobile && (
              <WalletMultiButton 
                onClick={() => setVisible(true)} 
                style={{ 
                  padding: '10px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  marginRight: '20px',
                  alignItems: 'center',
                  fontSize: '16px',
                  color: '#FFFFFF',
                  backgroundColor: '#5099CC',
                  borderRadius: '12px',
                  fontFamily: 'Inter',
                  height: '44px',
                  width: 'auto',
                }} 
              />           
            )
          )}
          {isMobile && (
            <div className='w-full md:hidden flex justify-center items-center'>
              <WalletMultiButton
                onClick={() => setVisible(true)}
                style={{
                  marginTop: '8px',
                  padding: '10px 20px',
                  fontSize: '14px', 
                  color: '#FFFFFF', 
                  backgroundColor: '#5099CC', 
                  borderRadius: '12px', 
                }}
              />
            </div>
          )}
        </div>
        */}

export default TopBar;
