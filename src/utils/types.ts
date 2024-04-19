import { BN, Idl, IdlAccounts, IdlTypes } from '@coral-xyz/anchor';
import { Connection, PublicKey, Signer, Transaction } from '@solana/web3.js';
import { OpenbookV2 } from './idl/openbook_v2';
import CoinLogos from '../config/logos.json';
import { ArcanaVaults } from './idl/arcana_vaults';

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

// Instructions and Accounts
export interface VaultAccount {
  bump: number;
  isInitialized: boolean;
  owner: PublicKey;
  vault: PublicKey;
  baseTokenLiquidityShares: bigint;
  quoteTokenLiquidityShares: bigint;
}

export interface UnifiedVault {
  bump: number;
  owner: PublicKey;
  marketIdentifier: PublicKey;
  baseVault: PublicKey;
  quoteVault: PublicKey;
  baseLiquidityShares: bigint;
  quoteLiquidityShares: bigint;
  downtimeStartTimestamp: bigint;
  downtimeEndTimestamp: bigint;
  cycleDurationInSeconds: bigint;
  downtimeInSeconds: bigint;
  lastUpdateSlot: bigint;
}

export interface InitializeVaultArgs {
  cycleDurationInSeconds: BN
  downtimeInSeconds: BN
}

export interface InitializeVaultAccounts {
  owner: PublicKey
  marketIdentifier: PublicKey
  vault: PublicKey
  baseMint: PublicKey
  quoteMint: PublicKey
  vaultBaseTokenAccount: PublicKey
  vaultQuoteTokenAccount: PublicKey
  associatedTokenProgram: PublicKey
  tokenProgram: PublicKey
  systemProgram: PublicKey
}

export interface DepositFundsAccounts {
  owner: PublicKey
  marketIdentifier: PublicKey
  vault: PublicKey
  depositReceipt: PublicKey
  mint: PublicKey
  userTokenAccount: PublicKey
  vaultTokenAccount: PublicKey
  tokenProgram: PublicKey
  systemProgram: PublicKey
}

export interface CloseVaultAccounts {
  owner: PublicKey
  vault: PublicKey
  baseVault: PublicKey
  quoteVault: PublicKey
}

export interface WithdrawAllFundsAccounts {
  owner: PublicKey
  marketIdentifier: PublicKey
  vault: PublicKey
  depositReceipt: PublicKey
  userTokenAccount: PublicKey
  vaultTokenAccount: PublicKey
  tokenProgram: PublicKey
}

export interface RefreshQuotesOnOpenbookV2Accounts {
  owner: PublicKey
  vault: PublicKey
  openOrdersAccount: PublicKey
  baseVault: PublicKey
  quoteVault: PublicKey
  market: PublicKey
  bids: PublicKey
  asks: PublicKey
  eventHeap: PublicKey
  baseTokenMarketVault: PublicKey
  quoteTokenMarketVault: PublicKey
  tokenProgram: PublicKey
  openbookProgram: PublicKey
  systemProgram: PublicKey
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
export type PlaceOrderArgs = IdlTypes<ArcanaVaults>['PlaceOrderArgs'];
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
  