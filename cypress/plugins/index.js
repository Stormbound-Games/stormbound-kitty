const path = require('path')
const preprocessor = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  on(
    'file:preprocessor',
    preprocessor({
      webpackOptions: {
        resolve: { alias: { '~': path.resolve('src') } },
      },
    })
  )

  return config
}
