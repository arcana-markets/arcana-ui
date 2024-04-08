'use client'

import React, { useCallback, useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { notify } from '@/utils/notifications';
import Notifications from '@/components/Shared/Notifications';

export function Providers({ children }: { children: React.ReactNode; }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [
    new LedgerWalletAdapter(),
  ], []);

  const onError = useCallback((error: WalletError) => {
    console.error(error);
    notify({
      type: 'error',
      description: 'Wallet Error',
      message: error.message,
    });
  }, []);

  return (
  <ConnectionProvider endpoint={endpoint}>
    <Notifications />
      <WalletProvider wallets={wallets} autoConnect={false} onError={onError}>
        <WalletModalProvider>
            {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
