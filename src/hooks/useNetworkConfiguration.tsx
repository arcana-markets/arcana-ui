import useLocalStorageState from './useLocalStorageState';
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
  });

  const [customEndpoint, setCustomEndpoint] = useLocalStorageState<string>({
    key: 'arcana-custom-endpoint',
    defaultValue: 'https://mainnet.helius-rpc.com/?api-key=294bf8a8-a997-41e1-b263-cbdf0f377b07',
  });

  const endpoint = useMemo(() => {
    switch (network) {
      case Networks.Mainnet:
        return 'https://mainnet.helius-rpc.com/?api-key=294bf8a8-a997-41e1-b263-cbdf0f377b07';
      case Networks.Devnet:
        return 'https://mainnet.helius-rpc.com/?api-key=294bf8a8-a997-41e1-b263-cbdf0f377b07';
      case Networks.Localnet:
        return 'http://127.0.0.1:8899';
      case Networks.Custom:
        return customEndpoint || clusterApiUrl('mainnet-beta');
      default:
        return clusterApiUrl('devnet');
    }
  }, [network, customEndpoint]);

  return {
    endpoint,
    network,
    setNetwork,
    setCustomEndpoint,
  };
}
