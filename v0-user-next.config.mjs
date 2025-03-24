/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["mongodb", "mongoose"],
  },
  webpack: (config) => {
    // This is to handle the binary modules that are not compatible with the browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      dns: false,
      tls: false,
      fs: false,
      request: false,
      child_process: false,
    };
    return config;
  },
};

export default nextConfig;

