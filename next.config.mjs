/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 's2.coinmarketcap.com' },
      // Allows any images from s2.coinmarketcap.com over HTTPS
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      // Allows any images from raw.githubusercontent.com over HTTPS
    ],
  },
}

export default nextConfig;
