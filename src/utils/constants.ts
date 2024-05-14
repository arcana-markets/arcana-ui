import { PublicKey, Connection } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';

export const RPC_ENDPOINT = 'https://mainnet.helius-rpc.com/?api-key=47474b09-903b-4379-8605-d08741b72917';
export const HELIUS_KEY = "fdb842cc-15ee-4ecc-9618-3eb85ccb19cb"; // helius used for ws updates on orderbook
export const connection = new Connection(RPC_ENDPOINT, "confirmed");
export const CONNECTION_COMMITMENT = 'processed'
export const RPC_PROVIDER_KEY = 'rpcProviderKey-0.11'
export const stored_user_pubkey = "pubkey";

export const OPENBOOK_PROGRAM_ID = new PublicKey('opnb2LAfJYbRMAHHvqjCwQxanZn7ReEHp1k81EohpZb');

export const WRAPPED_SOL_MINT = new PublicKey('So11111111111111111111111111111111111111112');

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

export const ARCANA_PROGRAM_ID = new PublicKey('FVbmcn58GVgYAGYqtQwVWwWrTDbSFqwXfCrErGEGo1mx');

export const ARCANA_DATA_API_URL = 'https://prod.arcana.markets/api/openbookv2/markets'
// export const BASE_OPENBOOK_URL = 'https://prod.arcana.markets/api/openbookv2/markets';
// export const BASE_PHOENIX_URL = 'https://prod.arcana.markets/api/phoenix/markets';

export const DEFAULT_MARKET_ID = 'BU3EaRVo9WN44muCBy3mwkCQ4uYQWiuqay1whEmeSXK3';

export const TOKEN_LIST_API = "https://token.jup.ag/all";
export const STRICT_TOKEN_LIST_API = "https://token.jup.ag/strict";

export const NUMERAL_FORMAT = '0,0.00';
export const BASE_FORMAT = '0,0';
export const SLOTS_PER_10_SECS: number = 25;
export const TEN_DAYS_IN_SLOTS: number = 10 * 24 * 60 * 6 * SLOTS_PER_10_SECS;
export const QUOTE_LOTS = 0.0001;
export const BN_0 = new BN(0);
