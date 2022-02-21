import fs from 'fs'
import path from 'path'
import preprocessor from '@cypress/webpack-preprocessor'
import getSearchIndex from '~/helpers/getSearchIndex'

// For some reason I get a ` Cannot find module 'fs/promises'` error on Cypress
// so we use a custom promise wrapper. Silly but heh, I don’t have the will to
// investigate.
const writeFile = (path, content) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, content, 'utf8', error => {
      if (error) reject(error)
      else resolve()
    })
  })

const configuration = (on, config) => {
  // Retrieve the path registry for the route tests and write it as a fixture
  // file so it can be statically imported.
  return getSearchIndex()
    .then(registry => {
      const filePath = path.resolve('cypress', 'fixtures', 'registry.json')
      const payload = JSON.stringify(registry, null, 2)

      return writeFile(filePath, payload)
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
