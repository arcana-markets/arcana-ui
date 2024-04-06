import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "@/utils/notifications";
import useUserSOLBalanceStore from '@/stores/useUserSOLBalanceStore';

export const RequestAirdrop: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const { getUserSOLBalance } = useUserSOLBalanceStore();

    const onClick = useCallback(async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            // Updated call with 'title'
            notify({
                type: 'error',
                title: 'Connection Error', // Provide a suitable title
                message: 'Wallet not connected!',
                description: 'Please connect your wallet to proceed.'
            });
            return;
        }
    
        let signature: TransactionSignature = '';
    
        try {
            signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
    
            // Get the latest block hash to use in our transaction and confirmation
            let latestBlockhash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed');
    
            notify({
                type: 'success',
                title: 'Airdrop Success', // Provide a suitable title
                message: 'Airdrop successful!',
                txid: signature
            });
    
            getUserSOLBalance(publicKey, connection);
        } catch (error: any) {
            // Updated call with 'title'
            notify({
                type: 'error',
                title: 'Airdrop Error', // Provide a suitable title
                message: 'Airdrop failed!',
                description: error?.message,
                txid: signature
            });
            console.log('error', `Airdrop failed! ${error?.message}`, signature);
        }
    }, [publicKey, connection, getUserSOLBalance]);

    return (

        <div className="flex flex-row justify-center">
                <div className="relative group items-center">
                    <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                    rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            
                        <button
                            className="text-foxflowerviola sm:text-white text-sm sm:text-base font-medium sm:py-[10px] p-3 sm:px-4 rounded-xl bg-[#013746] sm:bg-[#252B32] Connect_btn transition-all duration-300 ease-linear"
                            onClick={onClick}
                            >
                                <span>Airdrop 1 SOL</span>
                
                        </button>
                </div>
        </div>

        
    );
};
