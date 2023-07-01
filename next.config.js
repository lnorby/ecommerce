/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'wp.laszlonorbert.hu',
         },
      ],
   },
};

module.exports = nextConfig;
