const fs = require('fs')
const changelog = require('./src/data/changelog')

fs.writeFileSync(
  './changelog.json',
  JSON.stringify(
    changelog.map(entry => {
      const date = new Date(entry.date)

      entry.date =
        String(date.getDate()).padStart(2, '0') +
        '/' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '/' +
        String(date.getFullYear())

      console.log(entry, date)

      return entry
    }),
    null,
    2
  )
)
