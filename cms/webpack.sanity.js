const path = require('path')

module.exports = function (config, options) {
  config.resolve.alias['~'] = path.resolve(__dirname, '..', 'src')
  config.resolve.extensions.push('.json')

  console.log(config, options)

  return config
}
