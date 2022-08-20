const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  console.log(process.env);
  app.use(
    '/innerApi',
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
      pathRewrite: {
        '^/innerApi': '',
      },
      changeOrigin: true,
    }),
  );
};