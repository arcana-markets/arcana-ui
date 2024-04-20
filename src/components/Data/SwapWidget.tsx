import React, { useEffect, useMemo, useState } from 'react';
import { RPC_ENDPOINT } from '../../utils/constants';
import * as Icons from "@/components/common/svg/Icons";
import { PublicKey } from '@solana/web3.js';

const SwapWidget = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const PLATFORM_FEE_AND_ACCOUNTS = useMemo(() => ({
    referralAccount: new PublicKey("6jE5KKjene8TGZPF2ZAujYkxqSNZWPZzDwNdd2f8s3dr"),
    feeBps: 200,
    feeAccounts: new Map(),
  }), []);

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
          backgroundColor: '', // Background color
          color: '', // Text color
          maxHeight: 800, // Max height
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
  }, [PLATFORM_FEE_AND_ACCOUNTS, refreshKey]);

  const refreshWidget = () => {
    setRefreshKey(0+1);
  };

  return (
    <div className={`relative w-full min-w-[400px] max-w-[400px] flex flex-col bg-[#012630] rounded-[16px] pt-2 sm:pt-4 z-0`}>
      <button onClick={refreshWidget} className='absolute top-[-50px] left-[4px] bg-[#013746] sm:bg-[#012630] transition-all duration-300 ease-linear hover:bg-[#5099CC] text-white font-bold py-2 px-4 rounded-[18px]' title="Refresh">
        ↻
      </button>
      <div key={refreshKey} id="integrated-terminal" className='w-full p-4 rounded-md'>
      </div>
      <div className='w-full py-2 sm:py-3 rounded-b-[16px] text-[12px] sm:text-[14px] font-medium flex justify-center items-center gap-1' style={{ marginTop: '-16px' }}>
        <a href="https://jup.ag" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        <p>Powered by Jupiter</p>
          <Icons.powerdBy />
        </a>
      </div>
    </div>
  );
};

export default SwapWidget;