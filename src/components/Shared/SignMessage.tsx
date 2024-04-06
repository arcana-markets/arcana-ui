// TODO: SignMessage
import { verify } from '@noble/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useCallback } from 'react';
import { notify } from "@/utils/notifications";

export const SignMessage: FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const { publicKey, signMessage } = useWallet();

    const onClick = useCallback(async () => {
        try {
            if (!publicKey) throw new Error('Wallet not connected!');
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            
            const message = new TextEncoder().encode('Welcome to Arcana Markets!');
            const signature = await signMessage(message);

            if (await verify(signature, message, publicKey.toBytes())) {
                notify({ type: 'success', message: 'Sign message successful!', txid: bs58.encode(signature) });
                onSuccess(); 
            } else {
                throw new Error('Invalid signature!');
            }
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.error('Sign Message failed', error);
        }
    }, [publicKey, signMessage, onSuccess]);

    return (
        <div className="flex justify-center mt-4">
            <button
                className={`transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-purple-600 hover:to-orange-500 text-white shadow-lg ${
                    !publicKey ? "opacity-50 cursor-not-allowed" : "animate-pulse"
                }`}
                onClick={onClick}
                disabled={!publicKey}
            >
                {publicKey ? "Sign In" : "Wallet not connected"}
            </button>
        </div>
    );
};