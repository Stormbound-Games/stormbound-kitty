const fs = require('fs')
const { execSync } = require('child_process')
const decks = require('./src/data/decks')

let line = 3

decks.forEach(deck => {
  const log = execSync(
    `git log -u -L ${line},${line}:src/data/decks.json`
  ).toString()
  const date = new Date(log.split('\n')[2].replace(/Date:\s+/, ''))
  deck.date =
    String(date.getMonth()).padStart(2, '0') + '.' + date.getFullYear()

  line += Object.keys(deck).length + 2 - 1
})

console.log(decks)
fs.writeFileSync('decks.json', JSON.stringify(decks, null, 2), 'utf8')
