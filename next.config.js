/** @type {import('next').NextConfig} */



module.exports = {
  nextConfig:{
    reactStrictMode: true,
   forceSwcTransforms: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ]
  },
}