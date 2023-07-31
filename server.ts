import { createRequestHandler } from '@remix-run/node';
import { getRootLoader } from '@remix-run/server';
import { getAppEntries } from '@remix-run/utils';
import { headers } from './headers'; // Import the headers function

const rootLoader = getRootLoader(getAppEntries());

// Add the headers function to the server routes
const handleRequest = createRequestHandler({
  getLoadContext() {
    return {};
  },
  async getSession() {
    return {};
  },
  rootLoader,
//   headers(req, res) {
//     // Set the cache control headers
//     res.setHeader('Cache-Control', 'public, max-age=31536000');
//   },
  headers(req, res) {
    // Set the cache control headers
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Set max-age to 1 year
  },
});

// Rest of your server code...

export default handleRequest;
