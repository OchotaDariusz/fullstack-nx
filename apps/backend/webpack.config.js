const { composePlugins, withNx } = require('@nrwl/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  const conf = {
    ...config,
    externals: {
      electron: "require('electron')",
      child_process: "require('child_process')",
      fs: "require('fs')",
      os: "require('os')",
      path: "require('path')",
      crypto: "require('crypto')",
    },
  };

  return conf;
});
