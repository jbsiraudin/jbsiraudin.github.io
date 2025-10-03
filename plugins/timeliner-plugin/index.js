module.exports = function timelinerPlugin(context, options) {
  return {
    name: 'timeliner-plugin',
    getClientModules() {
      return [require.resolve('./src/client-modules/timeliner')];
    },
    configureWebpack(config, isServer) {
      if (isServer) {
        // Exclude Paper.js and its dependencies from server-side bundle
        return {
          externals: [
            {
              'paper': 'paper',
              'canvas': 'canvas',
              'jsdom': 'jsdom'
            }
          ]
        };
      }
      return {};
    },
  };
};
