/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['elch.mn'],
    unoptimized: true,
  },
  
  // 🔥 /uploads requests-ийг backend руу чиглүүлэх
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*',
      },
    ];
  },

  // 🔥 /peoples-representative → /submissions redirect
  async redirects() {
    return [
      {
        source: '/peoples-representative',
        destination: '/submissions',
        permanent: true, // 301 redirect
      },
      {
        source: '/peoples-representative/:path*',
        destination: '/submissions/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;