import { createRequestHandler } from '@remix-run/node';
import { createRequest } from '@remix-run/server';
import { HeadersFunction } from '@remix-run/core';

// Set the cache control headers for static assets
export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, max-age=31536000, immutable',
  };
};

console.log("OJJJA")
export default createRequestHandler({
  getLoadContext() {
    return {};
  },
  async getSession() {
    return {};
  },
  async getRootLoader() {
    return () => ({
      paths: [],
      context: {},
    });
  },
  async methodNotAllowed() {
    return { status: 405, statusText: 'Method Not Allowed' };
  },
  async notFound() {
    return { status: 404, statusText: 'Not Found' };
  },
  headers,
});
