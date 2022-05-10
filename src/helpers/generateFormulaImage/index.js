import fs from 'fs/promises'
// The following 2 dependencies are rather large and typically unused since they
// are only needed by this script, so they are actually not part of the project.
// You will need to install them locally before running the script:
// `npm install mathjax-node svg2png --no-save`.
import MathJax from 'mathjax-node'
import svg2png from 'svg2png'

MathJax.config({
  displayMessages: false,
  displayErrors: true,
  undefinedCharError: true,
  extensions: ['TeX/autoload-all.js', 'TeX/color.js'].join(','),
})

MathJax.start()

const convert = async (result, { scale = 1, ex = 6 }) => {
  const width = result.width.slice(0, result.width.length - 2) * ex * scale
  const buffer = Buffer.from(result.svg, 'utf8')
  const stream = await svg2png(buffer, { width })

  return stream.toString('base64')
}

const generateFormulaImage = async (formula, destination) => {
  const math = `\\color{beige}${formula}`
  const config = { math, format: 'TeX', svg: true, scale: 1, ex: 20 }
  const result = await MathJax.typeset(config)
  const blob = await convert(result, config)

  return fs.writeFile(destination, blob, 'base64')
}

export default generateFormulaImage
