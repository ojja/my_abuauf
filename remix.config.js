const { withEsbuildOverride } = require("remix-esbuild-override");
const { createRoutesFromFolders } = require("@remix-run/v1-route-convention");
const {
  default: GlobalsPolyfills,
} = require("@esbuild-plugins/node-globals-polyfill");

// Add cache control headers to the headers section
const cacheControlHeaders = {
  "Cache-Control": "public, max-age=31536000",
};
/**
 * Define callbacks for the arguments of withEsbuildOverride.
 * @param option - Default configuration values defined by the remix compiler
 * @param isServer - True for server compilation, false for browser compilation
 * @param isDev - True during development.
 * @return {EsbuildOption} - You must return the updated option
 */
withEsbuildOverride((option, { isServer }) => {
  if (isServer) {
    option.platform = "node";
    option.define = {
      global: "globalThis",
    };
  }

  return option;
});

/** @type {import('@remix-run/dev').AppConfig}*/
module.exports = {
  devServerBroadcastDelay: 1000,
  devServerPort: 3002,
  // server: "./server.js",
  serverMinify: true,
  serverDependenciesToBundle: "all",
  serverBuildTarget: "cloudflare-pages",
  future: {
    unstable_tailwind: true,
    v2_routeConvention: true,
  },
  routes(defineRoutes) {
    return createRoutesFromFolders(defineRoutes);
  },
  headers: {
    "Content-Security-Policy": "frame-ancestors 'self' https://mtf.gateway.mastercard.com",
    ...cacheControlHeaders,
  },
  developmentServer: {
    compress: true, // Enable compression for served assets
    port: 3000, // Specify the port for the development server
  },
};
