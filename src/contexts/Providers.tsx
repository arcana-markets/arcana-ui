'use client';

import React, { useCallback, useMemo } from 'react';
import { WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { notify } from '@/utils/notifications';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useNetworkConfiguration } from '@/hooks/useNetworkConfiguration';
import Notifications from '@/components/Shared/Notifications';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode; }) {
  const { endpoint } = useNetworkConfiguration();

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [],
  );

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
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  );
}
