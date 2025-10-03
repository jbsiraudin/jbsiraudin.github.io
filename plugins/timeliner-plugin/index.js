module.exports = function timelinerPlugin(context, options) {
  return {
    name: 'timeliner-plugin',
    getClientModules() {
      return [require.resolve('./src/client-modules/timeliner')];
    },
  };
};
