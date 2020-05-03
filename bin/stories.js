const fs = require('fs')
const path = require('path')
const btoa = a => Buffer.from(a).toString('base64')

const manifest = fs
  .readdirSync(path.resolve('public/stories'))
  .map(fileName => {
    const story = require(path.resolve('public/stories/' + fileName))
    const oldId = btoa(encodeURIComponent(story.title + '-' + story.author))

    return {
      oldId,
      id: fileName.replace('.json', ''),
      title: story.title,
      author: story.author,
      content: story.content.slice(0, 160) + '…',
      category: story.category,
      cardId: story.cardId,
    }
  })

fs.writeFileSync(
  path.resolve('public/stories.json'),
  JSON.stringify(manifest, null, 2),
  'utf8'
)

console.log(manifest)
