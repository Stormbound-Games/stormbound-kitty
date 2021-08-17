const path = require('path')
const preprocessor = require('@cypress/webpack-preprocessor')

const ALIASES = {
  '~/bot': path.resolve('src/bot'),
  '~/components': path.resolve('src/components'),
  '~/constants': path.resolve('src/constants'),
  '~/data': path.resolve('src/data'),
  '~/helpers': path.resolve('src/helpers'),
  '~/hooks': path.resolve('src/hooks'),
  '~/pages': path.resolve('src/pages'),
  '~/styles': path.resolve('src/styles'),
}

module.exports = (on, config) => {
  require('@cypress/react/plugins/react-scripts')(on, config)

  on(
    'file:preprocessor',
    preprocessor({
      webpackOptions: { resolve: { alias: ALIASES }, node: { fs: 'empty' } },
    })
  )

  return config
}
