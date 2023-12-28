/**  @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
    ],
  },
  experimental: {
    swcPlugins: [
      ["next-superjson-plugin", {}]
    ]
  }
}

module.exports = nextConfig;