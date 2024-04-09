import useLocalStorageState from '@/hooks/useLocalStorageState';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';

export enum Networks {
  Mainnet = 'mainnet-beta',
  Devnet = 'devnet',
  Localnet = 'local',
  Custom = 'custom',
}

export function useNetworkConfiguration() {
  const [network, setNetwork] = useLocalStorageState<Networks>({
    key: 'arcana-network-configuration',
    defaultValue: Networks.Devnet,
    getInitialValueInEffect: false,
  });

  const [customEndpoint, setCustomEndpoint] = useLocalStorageState<string>({
    key: 'arcana-custom-endpoint',
    defaultValue: '',
    getInitialValueInEffect: false,
  });

  const endpoint = useMemo(() => {
    switch (network) {
      case Networks.Mainnet:
        return 'https://anabelle-40mqhl-fast-mainnet.helius-rpc.com';
      case Networks.Devnet:
        return 'https://wileen-8ijn88-fast-devnet.helius-rpc.com';
      case Networks.Localnet:
        return 'http://127.0.0.1:8899';
      case Networks.Custom:
        return customEndpoint || clusterApiUrl('mainnet-beta');
      default:
        return clusterApiUrl('mainnet-beta');
    }
  }, [network, customEndpoint]);

  return {
    endpoint,
    network,
    setNetwork,
    setCustomEndpoint: (s: string) =>
      setCustomEndpoint((old) =>
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi.test(s)
          ? s
          : old,
      ),
  };
}