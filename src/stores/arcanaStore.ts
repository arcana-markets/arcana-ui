import { FullMarketData, OrderBookData } from "@/utils/types";
import { create } from "zustand";

interface MarketState {
  marketId: string;
  marketData: FullMarketData | null;
  tradeHistory: any | null;
  orderBookData: OrderBookData | null;
  updateMarketId: (id: string) => void;
  setMarketData: (data: any) => void;
  setTradeHistory: (data: any) => void;
  setOrderBook: (data: any) => void;
  initializeMarketIdFromURL: () => void;
};

 const arcanaStore = create<MarketState>((set) => ({
  marketId: "",
  marketData: null,
  tradeHistory: [],
  orderBookData: null,

  initializeMarketIdFromURL: () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const urlMarketId = url.pathname.split('/').pop();
      if (urlMarketId && urlMarketId !== 'data') {
        set({ marketId: urlMarketId });
      }
    }
  },
  
  updateMarketId: (id: string) => {
    set({ marketId: id });
  },

  setMarketData: (data: any) => {
    set({ marketData: data });
  },

  setTradeHistory: (data: any) => {
    set({ tradeHistory: data });
  },

  setOrderBook: (data: any) => {
    set({ orderBookData: data });
  },
}));

export default arcanaStore