import React, { useEffect, useState } from 'react';
import { RPC_ENDPOINT } from '../../utils/constants';
import { PoweredBy } from "@/utils/Icons";
import { PublicKey } from '@solana/web3.js';

const PLATFORM_FEE_AND_ACCOUNTS = {
  referralAccount: new PublicKey('6jE5KKjene8TGZPF2ZAujYkxqSNZWPZzDwNdd2f8s3dr'),
  feeBps: 200,
  feeAccounts: new Map(),
};

const SwapWidget = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const scriptId = 'jupiter-terminal-script';
    const loadWidgetWithPreload = () => {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://terminal.jup.ag/main-v2.js';
        script.async = true;
        script.setAttribute('data-preload', '');
        script.onload = () => initJupiterWidget();
        document.head.appendChild(script);
      } else {
        initJupiterWidget();
      }
    };

    const initJupiterWidget = () => {
      window.Jupiter.init({
        displayMode: "integrated",
        integratedTargetId: "integrated-terminal",
        endpoint: RPC_ENDPOINT,
        strictTokenList: false,
        defaultExplorer: "Solscan",
        platformFeeAndAccounts: PLATFORM_FEE_AND_ACCOUNTS,
        containerStyles: {
          backgroundColor: '#161b24',
          color: '#161b24',
        },
      });
    };

    loadWidgetWithPreload();

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [refreshKey]);

  const refreshWidget = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className={`relative w-full flex flex-col bg-coarsewool rounded-[16px] pt-2 sm:pt-4`}>
    <div className="relative md:-mt-4 pb-4">
      <button onClick={refreshWidget} className="absolute top-[-50px] left-4 bg-[#013746] sm:bg-[#252B32] transition-all duration-300 ease-linear hover:bg-lightgrey text-white font-bold py-2 px-4 rounded-[18px]" title="Refresh">
        ↻
      </button>
      <span className="absolute top-[-50px] left-[calc(4rem+1rem)] bg-markergreen text-lightgrey opacity-70 text-sm font-medium px-4 py-1 rounded-full">
        Jupiter Swap - Live
      </span>
    </div>
      <div key={refreshKey} id="integrated-terminal" className='w-full rounded-md'>
      </div>
      <div className='w-full py-2 sm:py-3 rounded-b-[16px] text-[12px] sm:text-[14px] font-medium text-white flex justify-center items-center gap-1' style={{ marginTop: '-16px' }}>
        <a href="https://jup.ag" target="_blank" rel="noopener noreferrer"
         className="flex items-center gap-1">
          <p>Powered by Jupiter</p>
          <div className="w-6">
          <PoweredBy />
          </div>
        </a>
      </div>
    </div>
  );
};

export default SwapWidget;
