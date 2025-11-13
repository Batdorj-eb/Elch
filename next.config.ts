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
};

module.exports = nextConfig;