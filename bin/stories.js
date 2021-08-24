const fs = require('fs')
const path = require('path')

const removeJsonExtension = fileName => fileName.replace('.json', '')

const getFileData = dir => fileName => {
  const story = require(path.resolve(dir + '/' + fileName))

  return {
    ...story,
    id: removeJsonExtension(fileName),
    content: story.content.slice(0, 150) + '…',
  }
}

const extract = (dir, out) => {
  const isJson = fileName => fileName.endsWith('.json')
  const files = fs.readdirSync(path.resolve(dir)).filter(isJson)
  const data = files.map(getFileData(dir))

  fs.writeFileSync(path.resolve(out), JSON.stringify(data), 'utf8')
}

extract('./src/data/stories', './src/data/stories.json')
