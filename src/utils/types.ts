import { Idl, IdlAccounts, IdlTypes } from '@coral-xyz/anchor';
import { Connection, PublicKey, Signer, Transaction } from '@solana/web3.js';
import { OpenbookV2 } from './idl/openbook_v2';
import { ConditionalVault } from './idl/conditional_vault';
import CoinLogos from '../config/logos.json';
import { ArcanaVaults } from './idl/arcana_vaults';

export type ArcVaultAccount = IdlAccounts<ArcanaVaults>['vault']; // Adjust 'vault' if your actual account name differs
export type ConditionalVaultAccount = IdlAccounts<ConditionalVault>['conditionalVault']; // Example for ConditionalVault

export type PublicKeyString = string; // For simplicity, assuming public keys are handled as strings
export type u8 = number;
export type u64 = bigint;

export enum SelfTradeBehavior {
  DecrementTake,
  CancelProvide,
  AbortTransaction,
}

export enum PlaceOrderType {
  Limit,
  ImmediateOrCancel,
  PostOnly,
  Market,
  PostOnlySlide,
}

export enum Side {
  Bid,
  Ask,
}

export interface DepositReceipt {
  bump: u8;
  isInitialized: boolean;
  owner: PublicKeyString;
  vault: PublicKeyString;
  baseTokenLiquidityShares: u64;
  quoteTokenLiquidityShares: u64;
}

export interface UnifiedVault {
  bump: u8;
  owner: PublicKeyString;
  marketIdentifier: PublicKeyString;
  baseVault: PublicKeyString;
  quoteVault: PublicKeyString;
  baseLiquidityShares: u64;
  quoteLiquidityShares: u64;
  downtimeStartTimestamp: u64;
  downtimeEndTimestamp: u64;
  cycleDurationInSeconds: u64;
  downtimeInSeconds: u64;
  lastUpdateSlot: u64;
}

export interface InitializeVaultInstruction {
  owner: PublicKeyString;
  marketIdentifier: PublicKeyString;
  vault: PublicKeyString;
  baseMint: PublicKeyString;
  quoteMint: PublicKeyString;
  vaultBaseTokenAccount: PublicKeyString;
  vaultQuoteTokenAccount: PublicKeyString;
  associatedTokenProgram: PublicKeyString;
  tokenProgram: PublicKeyString;
  systemProgram: PublicKeyString;
  cycleDurationInSeconds: u64;
  downtimeInSeconds: u64;
}

export interface CloseVaultInstruction {
  owner: PublicKeyString;
  vault: PublicKeyString;
  baseVault: PublicKeyString;
  quoteVault: PublicKeyString;
}

export interface DepositFundsInstruction {
  owner: PublicKeyString;
  marketIdentifier: PublicKeyString;
  vault: PublicKeyString;
  depositReceipt: PublicKeyString;
  mint: PublicKeyString;
  userTokenAccount: PublicKeyString;
  vaultTokenAccount: PublicKeyString;
  tokenProgram: PublicKeyString;
  systemProgram: PublicKeyString;
  amount: u64;
}

export interface WithdrawAllFundsInstruction {
  owner: PublicKeyString;
  marketIdentifier: PublicKeyString;
  vault: PublicKeyString;
  depositReceipt: PublicKeyString;
  userTokenAccount: PublicKeyString;
  vaultTokenAccount: PublicKeyString;
  tokenProgram: PublicKeyString;
}

// Add similar interfaces for other instructions as needed
export interface ArcanaVaultsError {
  code: number;
  name: string;
  msg: string;
}



export interface MarketData {
  marketId: string;
  baseMint: string;
  quoteMint: string;
  name: string;
  midpoint: number;
};

export interface FullMarketData {
  marketId: string;
  bump: number;
  baseDecimals: number;
  quoteDecimals: number;
  marketAuthority: string;
  timeExpiry: number;
  collectFeeAdmin: string;
  openOrdersAdmin: string;
  consumeEventsAdmin: string;
  closeMarketAdmin: string;
  name: string;
  bids: string;
  asks: string;
  eventHeap: string;
  oracleA: string;
  oracleB: string;
  confFilter: number;
  maxStalenessSlots: number;
  quoteLotSize: number;
  baseLotSize: number;
  seqNum: number;
  registrationTime: number;
  makerFee: number;
  takerFee: number;
  feesAccrued: number;
  feesToReferrers: number;
  referrerRebatesAccrued: number;
  feesAvailable: number;
  makerVolume: number;
  takerVolume: number;
  makerVolumeNormalized: number;
  takerVolumeNormalized: number;
  notionalVolume: number;
  notionalVolume24hour: number;
  baseMint: string;
  quoteMint: string;
  marketBaseVault: string;
  baseDepositTotal: number;
  marketQuoteVault: string;
  quoteDepositTotal: number;
  bidOrders: Order[];
  askOrders: Order[];
  marketPerformance: MarketPerformance;
  midpoint: number;
};

export interface OrderBookData {
  midpoint: number;
  market: {
    bidOrders: Order[];
    askOrders: Order[];
  };
  identities: { [traderPublicKey: string]: string };
};

export interface Order {
  trader: string;
  identity?: string;
  price: number;
  size: number;
  sizePercent?: number;
};

interface MarketPerformance {
  marketId: string;
  current: number;
  minute30: number;
  hour1: number;
  hour4: number;
  hour24: number;
};

export interface TradeData {
  market: string;
  notionalVolume: number;
  marketName: string;
  identities: { [publicKey: string]: string };
  notionalVolume24Hour: number;
  trades: OpenBookTradeEvent[];
};

export interface OpenBookTradeEvent {
  timeStamp: number;
  makerOwner: string;
  takerOwner: string;
  priceDouble: number;
  quantityDouble: number;
  marketId: string;
  takerSide: number;
  marketName: string;
};

export interface CarouselCardProps {
      onCardClick: (marketId: string) => void;
      item: {
        market: {
          marketId: string;
          name: string;
          takerVolume: number;
          makerVolume: number;
          quoteDecimals: number;
          baseMint: string;
          quoteMint: string;
        },
        midpoint: number;
        marketPerformance: MarketPerformance;
      };
};

export type CoinLogosType = {
    [key: string]: string;
};

export const CoinLogosTyped: CoinLogosType = CoinLogos as CoinLogosType;

export type AccountWithKey<T> = { publicKey: PublicKey; account: T };
export type ProgramVersion = { label: string; programId: PublicKey; idl: Idl };

export type VaultAccount = IdlAccounts<ConditionalVault>['conditionalVault'];
export type VaultAccountWithKey = AccountWithKey<VaultAccount>;
export type OrderBookSide = {
  parsed: {
    price: any;
    size: any;
  }[];
  total: {
    price: any;
    size: any;
  };
  deduped: Map<any, any>;
};
export type OpenbookOrderBook =
  | {
      bidsProcessed: OrderBookSide | null;
      asksProcessed: OrderBookSide | null;
      bidsArray: any[][];
      asksArray: any[][];
      toB: {
        topAsk: number;
        topBid: number;
      };
      spreadString: string;
    }
  | undefined;
export type OrderBook =
  | {
      passBidsProcessed: OrderBookSide | null;
      passAsksProcessed: OrderBookSide | null;
      failBidsProcessed: OrderBookSide | null;
      failAsksProcessed: OrderBookSide | null;
      passBidsArray: any[][];
      passAsksArray: any[][];
      failBidsArray: any[][];
      failAsksArray: any[][];
      passToB: {
        topAsk: number;
        topBid: number;
      };
      failToB: {
        topAsk: number;
        topBid: number;
      };
      passSpreadString: string;
      failSpreadString: string;
    }
  | undefined;
export type OpenbookMarket = {
  market: MarketAccount;
  asks: LeafNode[];
  bids: LeafNode[];
};
export type Markets = {
  pass: MarketAccount;
  passAsks: LeafNode[];
  passBids: LeafNode[];
  fail: MarketAccount;
  failAsks: LeafNode[];
  failBids: LeafNode[];
  baseVault: VaultAccount;
  quoteVault: VaultAccount;
};
export type AllMarketsInfo = { [proposalKey: string]: Markets | undefined };
export interface InitializedVault {
  tx?: Transaction;
  signers: Signer[];
  vault: PublicKey;
  finalizeMint: PublicKey;
  revertMint: PublicKey;
}

/// Avoid importing Openbook because it uses a NodeWallet
export type PlaceOrderArgs = IdlTypes<OpenbookV2>['PlaceOrderArgs'];
export type PlaceOrderPeggedArgs = IdlTypes<OpenbookV2>['PlaceOrderPeggedArgs'];
export type OracleConfigParams = IdlTypes<OpenbookV2>['OracleConfigParams'];
export type OracleConfig = IdlTypes<OpenbookV2>['OracleConfig'];
export type MarketAccount = IdlAccounts<OpenbookV2>['market'];
export type MarketAccountWithKey = AccountWithKey<MarketAccount>;
export type OpenOrdersAccount = IdlAccounts<OpenbookV2>['openOrdersAccount'];
export type OpenOrdersAccountWithKey = AccountWithKey<OpenOrdersAccount>;
export type AllOrders = { [proposalKey: string]: OpenOrdersAccountWithKey[] };
export type OpenOrdersIndexerAccount = IdlAccounts<OpenbookV2>['openOrdersIndexer'];
export type EventHeapAccount = IdlAccounts<OpenbookV2>['eventHeap'];
export type BookSideAccount = IdlAccounts<OpenbookV2>['bookSide'];
export type LeafNode = IdlTypes<OpenbookV2>['LeafNode'];
export type AnyNode = IdlTypes<OpenbookV2>['AnyNode'];
export type FillEvent = IdlTypes<OpenbookV2>['FillEvent'];
export type OutEvent = IdlTypes<OpenbookV2>['OutEvent'];

export enum InstructionFieldTypes {
  Text,
  Number,
  BigNumber,
  Key,
};

export type InstructionFieldType = {
    type: InstructionFieldTypes;
    required: boolean;
    label: string;
    description: string;
  };

export type InstructionAction = {
    label: string;
    fields: InstructionFieldType[];
    instruction: (
      params: any[],
      options?: { connection?: Connection },
    ) => Promise<boolean>;
  };

export type InstructionSet = {
    name: string;
    actions: InstructionAction[];
  };