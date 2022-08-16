const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware('/api/naver', {
      target: 'https://naveropenapi.apigw.ntruss.com',
      pathRewrite: {
        '^/api/naver': '',
      },
      changeOrigin: true,
    }),
  );
};