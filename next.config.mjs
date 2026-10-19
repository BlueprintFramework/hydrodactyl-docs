import { createMDX, start } from "fumadocs-mdx/next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";
import path from "node:path";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "camo.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
};

export default async function nextConfig(phase) {
  // Next 16 loads this file in a worker whose argv lacks "dev", so createMDX()
  // never starts the .source generator on its own. Start it based on phase.
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  if (
    (isDev || phase === PHASE_PRODUCTION_BUILD) &&
    process.env._FUMADOCS_MDX !== "1"
  ) {
    process.env._FUMADOCS_MDX = "1";
    await start(isDev, path.resolve("source.config.ts"), ".source");
  }

  return withMDX(config);
}
