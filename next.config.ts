import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Live-site images are used until `npm run assets:pull` copies them into /public/images.
    remotePatterns: [{ protocol: "https", hostname: "www.bitsnpixs.com", pathname: "/web/image/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
