import React, { FC, useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { notify } from "@/utils/notifications";
import useUserSOLBalanceStore from '@/stores/useUserSOLBalanceStore';
import Loading from '../tempMarketData/Loading';
import { SignMessage } from './SignMessage';
import useLocalStorageState from '@/hooks/useLocalStorageState';

export const RequestAirdrop: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const { getUserSOLBalance } = useUserSOLBalanceStore();
    const [isLoading, setIsLoading] = useLocalStorageState<boolean>({
        key: 'isLoadingForAirdrop',
        defaultValue: false,
      });
      // Use useLocalStorageState hook for hasSigned state
      const [hasSigned, setHasSigned] = useLocalStorageState<boolean>({
        key: 'hasSignedMessage',
        defaultValue: false,
      });

      const requestAirdrop = useCallback(async () => {
        if (!publicKey) {
            notify({ type: 'error', message: 'Wallet Not Connected', txid: '' });
            console.error('Wallet not connected');
            return;
        }

        setIsLoading(true);

        try {
            const signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
            let latestBlockhash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed');
            notify({ type: 'success', message: 'Airdrop Successful', txid: signature });
            getUserSOLBalance(publicKey, connection);
        } catch (error: any) {
            notify({ type: 'error', message: 'Airdrop Failed', description: error?.message, txid: '' });
            console.error('Airdrop failed', error);
        } finally {
            setIsLoading(false);
        }
    }, [publicKey, connection, getUserSOLBalance, setIsLoading]);

    return (
        <div className="flex flex-row justify-center">
            {isLoading ? (
                <Loading />
            ) : hasSigned ? (
                <button className='text-foxflowerviola sm:text-white text-sm sm:text-base font-medium sm:py-[10px] p-3 sm:px-4 rounded-xl bg-[#013746] sm:bg-[#252B32] Connect_btn transition-all duration-300 ease-linear'
                onClick={requestAirdrop}>Airdrop 1 SOL</button>
                ) : (
                <SignMessage onSuccess={() => setHasSigned(true)} />
            )}
        </div>
    );
};