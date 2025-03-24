let userConfig;
try {
  userConfig = (await import("./v0-user-next.config.js")).default;
} catch (e) {
  userConfig = {}; // Если файл не найден, просто игнорируем
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) return baseConfig;

  for (const key in userConfig) {
    if (typeof baseConfig[key] === "object" && !Array.isArray(baseConfig[key])) {
      baseConfig[key] = { ...baseConfig[key], ...userConfig[key] };
    } else {
      baseConfig[key] = userConfig[key];
    }
  }

  return baseConfig;
}

export default mergeConfig(nextConfig, userConfig);
