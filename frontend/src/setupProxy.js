const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This will proxy any request starting with /api
    createProxyMiddleware({
      target: 'http://localhost:8000', // Your backend server
      changeOrigin: true,
    })
  );
};
