/**  @type {import('next').NextConfig} */

const nextConfig = {
  
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