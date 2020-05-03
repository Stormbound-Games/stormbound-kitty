const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const config = require('react-scripts/config/webpack.config')('production')

config.plugins.push(new BundleAnalyzerPlugin())
webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err)
  }
})
