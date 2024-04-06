import useLocalStorageState from '@/hooks/useLocalStorageState';
import { useCallback, useMemo } from 'react';

export enum Explorers {
  SolanaFM = 'solanafm',
  Solscan = 'solscan',
  Xray = 'xray',
  Solana = 'solana',
}

export function useExplorerConfiguration() {
  const [explorer, setExplorer] = useLocalStorageState<Explorers>({
    key: 'arcana-explorer-configuration',
    defaultValue: Explorers.Solscan,
    getInitialValueInEffect: true,
  });

  const url = useMemo(() => {
    switch (explorer) {
      case Explorers.SolanaFM:
        return 'https://solana.fm/';
      case Explorers.Solscan:
        return 'https://solscan.io/';
      case Explorers.Xray:
        return 'https://xray.helius.xyz/';
      case Explorers.Solana:
        return 'https://explorer.solana.com/';
      default:
        return 'https://explorer.solana.com/';
    }
  }, [explorer]);

  const matchSuffix = useCallback(
    (type: string) => {
      switch (type) {
        case 'account':
          // @ts-ignore
          if ([Explorers.Solscan, Explorers.Solana].includes(explorer)) {
            return `${url}address/`;
          }
          return `${url}account/`;
        case 'transaction':
          return `${url}tx/`;
        default:
          return url;
      }
    },
    [explorer, url],
  );

  const generateExplorerLink = useCallback(
    (element: string, type: 'account' | 'tx' | 'transaction') => matchSuffix(type) + element,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [explorer],
  );

  return { url, explorer, setExplorer, generateExplorerLink };
}