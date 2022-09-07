import fs from 'fs/promises'
// The `svg2png` and `mathjax-node` dependencies are rather large and typically
// unused since they are only needed by this script, so they are actually not
// part of the project. They are installed at runtime via `npx-import` when
// running the script.
import { npxImport } from 'npx-import'

const convert = async (result, { scale = 1, ex = 6 }) => {
  const width = result.width.slice(0, result.width.length - 2) * ex * scale
  const buffer = Buffer.from(result.svg, 'utf8')
  const svg2png = await npxImport('svg2png@4')
  const stream = await svg2png(buffer, { width })

  return stream.toString('base64')
}

const generateFormulaImage = async (formula, destination) => {
  const MathJax = await npxImport('mathjax-node@2')

  MathJax.config({
    displayMessages: false,
    displayErrors: true,
    undefinedCharError: true,
    extensions: ['TeX/autoload-all.js', 'TeX/color.js'].join(','),
  })

  MathJax.start()

  const math = `\\color{beige}${formula}`
  const config = { math, format: 'TeX', svg: true, scale: 1, ex: 20 }
  const result = await MathJax.typeset(config)
  const blob = await convert(result, config)

  return fs.writeFile(destination, blob, 'base64')
}

export default generateFormulaImage
