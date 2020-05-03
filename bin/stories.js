const fs = require('fs')
const path = require('path')
const cards = require('../src/data/cards.json')

const btoa = a => Buffer.from(a).toString('base64')
const getRawCardData = id => cards.find(card => card.id === id)
const removeJsonExtension = fileName => fileName.replace('.json', '')
const getOldId = story =>
  btoa(encodeURIComponent(story.title + '-' + story.author))

const getFileData = dir => fileName => {
  const story = require(path.resolve(dir + '/' + fileName))
  const card = { ...getRawCardData(story.cardId), ...story.card }

  return {
    ...story,
    card,
    oldId: getOldId(story),
    id: removeJsonExtension(fileName),
    content: story.content.slice(0, 150) + '…',
  }
}

const extract = (dir, out) => {
  const isJson = fileName => fileName.endsWith('.json')
  const files = fs.readdirSync(path.resolve(dir)).filter(isJson)
  const data = files.map(getFileData(dir))

  fs.writeFileSync(path.resolve(out), JSON.stringify(data, null, 2), 'utf8')
}

extract('public/stories', 'public/stories.json')
