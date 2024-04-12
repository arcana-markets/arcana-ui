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
    ],
  },
  async redirects() {
    return [
      {
        source: '/data',
        destination: '/data/BU3EaRVo9WN44muCBy3mwkCQ4uYQWiuqay1whEmeSXK3',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
