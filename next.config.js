/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'teszt-uzlet.eu.saleor.cloud',
         },
      ],
   },
};

module.exports = nextConfig;
