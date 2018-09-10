module.exports = {
  runtimeCompiler: true,
  devServer: {
    host: '0.0.0.0',
    port: '3080',
    public: 'dashboard-dev.ms.wits.ac.za:3080',
    // https://cli.vuejs.org/config/#devserver-proxy
    proxy: {
      '/api': {
        // More Info: https://github.com/chimurai/http-proxy-middleware
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': '/',
        },
        // ws: true,
        // changeOrigin: true
      },
    },
  },
};
