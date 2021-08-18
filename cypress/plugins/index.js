const path = require('path')
const findWebpack = require('find-webpack')
const preprocessor = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  require('@cypress/react/plugins/react-scripts')(on, config)

  // Find the Webpack configuration used by `react-scripts`.
  const webpackOptions = findWebpack.getWebpackOptions()

  if (!webpackOptions) {
    throw new Error('Could not find Webpack in this project')
  }

  // Add aliased paths support to the Webpack configuration.
  webpackOptions.resolve.alias['~'] = path.resolve('src')

  // Just passing `webpackOptions` to the preprocessor won’t work because
  // `react-scripts` by default includes plugins that split specs into chunks,
  // etc. Thus, we use a module that carefully removes only plugins that we
  // found to be breaking the bundling.
  // https://github.com/bahmutov/find-webpack
  // https://github.com/cypress-io/cypress-webpack-preprocessor/issues/31
  findWebpack.cleanForCypress({ reactScripts: true }, webpackOptions)

  on('file:preprocessor', preprocessor({ webpackOptions, watchOptions: {} }))

  return config
}
