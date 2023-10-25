/** @type {import('next').NextConfig} */
const nextConfig = {
  //   reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ipfs.w3s.link",
        port: "",
        pathname: "",
      },
    ],
  },
};

module.exports = nextConfig;
