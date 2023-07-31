const express = require('express');
const session = require('express-session');
const { createRequestHandler } = require('@remix-run/express');
const path = require('path');

const app = express();

// Define the isLoggedIn function
function isLoggedIn(req) {
  return req.session && req.session.user;
}

// Session middleware configuration
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware to check if the user is logged in
app.use((req, res, next) => {
  if (isLoggedIn(req)) {
    // User is logged in, continue to the next middleware or route handler
    next();
  } else {
    // User is not logged in, redirect to the login page or show an error
    res.redirect('/login');
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y', // Set cache max age to 1 year
  immutable: true, // Enable immutability for cache optimization
  setHeaders: (res, path) => {
    if (path.endsWith('.webp')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  },
}));


// Handle Remix requests
app.all(
  '*',
  createRequestHandler({
    getLoadContext() {
      // Return the context object for your Remix app
      // You can include any data or utilities needed by your app
      return {
        isLoggedIn: (req) => isLoggedIn(req),
      };
    },
    getCustomHandler() {
      // Return a custom handler for additional routing logic
      // If you don't need custom routing, you can omit this method
      return null;
    },
    getSession(req) {
      // Return the session object for the current request
      // This is required when using session-based authentication
      return req.session;
    },
    headers(req, res) {
      // Set the cache control headers
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Set max-age to 1 hour
    },
  })
);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
