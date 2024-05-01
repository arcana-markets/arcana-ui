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
    ],
  },
  async redirects() {
    return [
      {
        source: '/data',
        destination: '/data/Gio5iGZF9YVvhX6vwW3fZEfnPhtafseapaseGbAoiH9D',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
