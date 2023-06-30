/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['raw.githubusercontent.com', '.githubusercontent.com'] }, 
  env: {
    URL_BASE_API: process.env.URL_BASE_API,
  }
}

module.exports = nextConfig
