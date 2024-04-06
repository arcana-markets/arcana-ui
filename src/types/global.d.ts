// Inside a global.d.ts file or another .d.ts file included in your TypeScript project
declare global {
    interface Navigator {
      wallets?: any[]; // Adjust the type as necessary
    }
  }

  export {};