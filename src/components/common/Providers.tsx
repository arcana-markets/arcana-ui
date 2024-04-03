import React, { useCallback, useMemo } from 'react';
import { WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter, LedgerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNetworkConfiguration } from '@/hooks/useNetworkConfiguration';
import { notify } from '@/utils/notifications'; // Ensure this path is correct

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode; }) {
  const { endpoint } = useNetworkConfiguration();

  const wallets = useMemo(() => [
    new SolflareWalletAdapter(),
    new PhantomWalletAdapter(),
    new LedgerWalletAdapter(),
  ], []);

  const onError = useCallback((error: WalletError) => {
    console.error(error);
    notify({
      type: 'error',
      title: 'Wallet Error',
      message: error.message,
      autoClose: 5000,
    });
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError}>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
