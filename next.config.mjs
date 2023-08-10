// @ts-nocheck
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: "/images/:path*",
        destination: "http://holmstrom.ddns.net:8080/df/:path*",
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "holmstrom.ddns.net",
        port: "8080",
        pathname: "/**",
      },
    ],
  },
};
export default config;
