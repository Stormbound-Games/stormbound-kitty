import fs from 'fs'
import path from 'path'
import preprocessor from '@cypress/webpack-preprocessor'
import indexArray from '~/helpers/indexArray'
import getCards from '~/api/cards/getCards'

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
  return getCards()
    .then(cards =>
      writeFile(
        path.resolve('cypress', 'fixtures', 'cards.json'),
        JSON.stringify(indexArray(cards), null, 2)
      )
    )
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
