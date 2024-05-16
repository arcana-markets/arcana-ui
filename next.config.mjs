// next.config.mjs

// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 's2.coinmarketcap.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'arweave.net' },
      { protocol: 'https', hostname: 'shdw-drive.genesysgo.net' },
      { protocol: 'https', hostname: 'cdn.kamino.finance' },
      { protocol: 'https', hostname: 'metadata.drift.foundation' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/data',
        destination: '/data/CFSMrBssNG8Ud1edW59jNLnq2cwrQ9uY5cM3wXmqRJj3',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
