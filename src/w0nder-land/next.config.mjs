/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'w0nder.work',
      },
      {
        protocol: 'https',
        hostname: 'w0nder.land',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: false, // 302 리다이렉트
      },
    ];
  },
};

export default nextConfig;
