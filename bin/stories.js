require('module-alias').addAlias('~', __dirname + '/../src')

const fs = require('fs/promises')
const getStories = require('~/api/stories/getStories').default

;(async () => {
  const stories = await getStories()
  const payload = JSON.stringify(stories)
  const path = './src/data/stories.json'

  await fs.writeFile(path, payload, 'utf8')
})()
