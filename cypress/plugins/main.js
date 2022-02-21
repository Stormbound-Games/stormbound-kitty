import fs from 'fs/promises'
import path from 'path'
import preprocessor from '@cypress/webpack-preprocessor'
import getSearchIndex from '~/helpers/getSearchIndex'

const configuration = (on, config) => {
  // Retrieve the path registry for the route tests and write it as a fixture
  // file so it can be statically imported.
  return getSearchIndex()
    .then(registry => {
      const filePath = path.resolve('cypress', 'fixtures', 'registry.json')
      const payload = JSON.stringify(registry, null, 2)

      return fs.writeFile(filePath, payload, 'utf8')
    })
    .then(() => {
      on(
        'file:preprocessor',
        preprocessor({
          webpackOptions: {
            resolve: { alias: { '~': path.resolve('src') } },
          },
        })
      )

      return config
    })
}

export default configuration
