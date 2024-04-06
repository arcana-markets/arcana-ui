import { notify } from '@/utils/notifications';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ComputeBudgetProgram, Transaction, VersionedTransaction } from '@solana/web3.js';
import { useCallback } from 'react';
import { NotificationLink } from '../components/Shared/NotificationLink';
import { usePriorityFee } from './usePriorityFee';

type SingleOrArray<T> = T | T[];

export const useTransactionSender = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { priorityFee } = usePriorityFee();

  const send = useCallback(
    /**
     * Sends transactions.
     * @param txs A sequence of sets of transactions. Sets are executed simultaneously.
     * @returns A sequence of set of tx signatures.
     */
    async <T extends Transaction | VersionedTransaction>(txs: SingleOrArray<T>[]) => {
      if (!connection || !wallet.publicKey || !wallet.signAllTransactions) {
        throw new Error('Bad wallet connection');
      }

      if (txs.length === 0 || (txs[0] instanceof Array && txs[0].length === 0)) {
        throw new Error('No transactions passed');
      }

      const sequence = txs[0] instanceof Array ? (txs as T[][]) : ([txs] as T[][]);

      const blockhask = await connection.getLatestBlockhash();
      const timedTxs = sequence.map((set) =>
        set.map((e: T) => {
          const tx = e;
          if (!(tx instanceof VersionedTransaction)) {
            tx.recentBlockhash = blockhask.blockhash;
            tx.feePayer = wallet.publicKey!;
            // Priority fee ix
            tx.instructions = [
              ComputeBudgetProgram.setComputeUnitPrice({ microLamports: priorityFee }),
              ...tx.instructions,
            ];
          }
          return tx;
        }),
      );

      try {
        const signedTxs = await wallet.signAllTransactions(timedTxs.flat());
        const signatures = [];

        // Reconstruct signed sequence
        const signedSequence: T[][] = [];
        let i = 0;
        sequence.forEach((set) => {
          const signedSet: T[] = [];
          set.forEach(() => {
            signedSet.push(signedTxs[i]);
            i += 1;
          });
          signedSequence.push(signedSet);
        });

        // eslint-disable-next-line no-restricted-syntax
        for (const set of signedSequence) {
          signatures.push(
            // eslint-disable-next-line no-await-in-loop
            ...(await Promise.all(
              set.map((tx) =>
                connection
                  .sendRawTransaction(tx.serialize(), {
                    skipPreflight: true,
                  })
                  .then((txSignature) =>
                    connection.confirmTransaction(txSignature).then(() => txSignature),
                  ),
              ),
            )),
          );
        }

        notify({
          title: 'Transactions sent!',
          message: (
            <div className="flex flex-col">
              {signatures.map((signature) => (
                <NotificationLink key={signature} signature={signature} />
              ))}
            </div>
          ),
        });
        return signatures;
      } catch (err) {
        notify({
          title: 'Transactions not sent!',
          message: <p>An error occured: {err?.toString()}</p>,
        });
        return [];
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wallet.publicKey, connection, priorityFee],
  );

  return { send };
};
