/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: "/img/:path*",
        destination: "http://129.16.159.26/img/:path*",
      },
    ];
  },
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default config;
