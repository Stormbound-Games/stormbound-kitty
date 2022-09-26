const path = require('path')

module.exports = function (config) {
  config.resolve.alias['#api'] = path.resolve(__dirname, '..', 'src/api')
  config.resolve.alias['#components'] = path.resolve(
    __dirname,
    '..',
    'src/components'
  )
  config.resolve.alias['#constants'] = path.resolve(
    __dirname,
    '..',
    'src/constants'
  )
  config.resolve.alias['#helpers'] = path.resolve(
    __dirname,
    '..',
    'src/helpers'
  )
  config.resolve.alias['#hooks'] = path.resolve(__dirname, '..', 'src/hooks')
  config.resolve.extensions.push('.json')

  return config
}
