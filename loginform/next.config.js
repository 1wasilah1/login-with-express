/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    BE: 'http://127.0.0.1:5000',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5000/:path*',
      },
    ]
  },
}