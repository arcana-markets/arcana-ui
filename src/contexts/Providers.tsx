'use client'

import React, { useCallback, useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNetworkConfiguration } from '@/hooks/useNetworkConfiguration';
import { notify } from '@/utils/notifications';
import Notifications from '@/components/Shared/Notifications';

const queryClient = new QueryClient();

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
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
