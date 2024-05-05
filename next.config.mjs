/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/geodata",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
