import fs from 'fs'
import path from 'path'
import replace from 'replace-in-file'

const pkg = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'))
const options = {
  files: './package.json',
  from: /kitty",/g,
  to: 'kitty",\n  "type": "module",',
}

if (pkg.type !== 'module') {
  try {
    const results = replace.sync(options)
    console.log('Replacement results:', results)
  } catch (error) {
    console.error('Error occurred:', error)
  }
}
