import { Connection, PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import { InstructionFieldTypes } from './types';
import EventEmitter from "eventemitter3";

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connect: () => any;
  disconnect: () => any;
}

export const shortKey = (key?: PublicKey | string) => {
  if (!key) return '???';
  const str = key?.toString();
  return `${str.substring(0, 4)}...${str.substring(str.length - 5, str.length)}`;
};

export const shortSignature = (sig?: TransactionSignature, length: number = 8) => {
  if (!sig) return '???';
  return `${sig.substring(0, length)}...`;
};

// Define the debounce function
export function debounce<T extends any[]>(
  callback: (...args: T) => Promise<void>,
  delay: number,
): (...args: T) => Promise<void> {
  let timerId: NodeJS.Timeout;
  return async (...args: T) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const validateType = async (type: InstructionFieldTypes, value?: string) => {
  switch (type) {
    case InstructionFieldTypes.Key:
      if (!value) {
        return false;
      }
      return /^[1-9A-HJ-NP-Za-km-z]{40,44}$/.test(value);
    default:
      return true;
  }
};

export const toScientificNotation = (number: number, decimalPlaces: number) =>
  // Convert number to scientific notation with specified decimal places
   number.toExponential(decimalPlaces);
