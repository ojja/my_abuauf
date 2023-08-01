const { withEsbuildOverride } = require("remix-esbuild-override");
const { createRoutesFromFolders } = require("@remix-run/v1-route-convention");
// const { default: GlobalsPolyfills } = require("@esbuild-plugins/node-globals-polyfill");

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
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
  ...(process.env.NODE_ENV === "production"
    ? {
        serverBuildTarget: "cloudflare-pages",
        // serverBuildPath: "functions/[[path]].js",
        serverBuildPath: "build",
        serverConditions: ["worker"],
        serverMainFields: ["browser", "module", "main"],
        serverModuleFormat: "esm",
        serverPlatform: "neutral",
        serverMinify: false,
        server: "./server.ts",
      }
    : {}),
  serverDependenciesToBundle: "all",
  future: {
    v2_routeConvention: true,
  },
  headers: {
    "Content-Security-Policy":
      "frame-ancestors 'self' https://mtf.gateway.mastercard.com",
    ...cacheControlHeaders,
  },
  routes(defineRoutes) {
    // uses the v1 convention, works in v1.15+ and v2
    return createRoutesFromFolders(defineRoutes);
  },
  postcss: true,
};
