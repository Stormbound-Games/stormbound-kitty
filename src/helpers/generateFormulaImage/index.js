import fs from 'fs/promises'
import MathJax from 'mathjax-node'
import svg2png from 'svg2png'

MathJax.config({
  displayMessages: false,
  displayErrors: true,
  undefinedCharError: true,
  extensions: 'TeX/autoload-all.js,TeX/color.js',
})

MathJax.start()

const PREFIX = 'data:image/png;base64,'

const convert = async (result, { scale = 1, ex = 6 }) => {
  result.pngWidth = result.width.slice(0, result.width.length - 2) * ex * scale

  const buffer = Buffer.from(result.svg, 'utf-8')
  const buff = await svg2png(buffer, { width: result.pngWidth })

  result.png = PREFIX + buff.toString('base64')

  return result
}

const typeset = options =>
  new Promise((resolve, reject) => {
    MathJax.typeset(options, result => {
      if (result.error) reject(result.error)
      else convert(result, options).then(resolve).catch(reject)
    })
  })

const generateFormulaImage = async (formula, destination) => {
  const math = `\\color{beige}${formula}`
  const config = { math, format: 'TeX', svg: true, scale: 1, ex: 20 }
  const data = await typeset(config)
  const blob = data.png.replace(PREFIX, '')

  return fs.writeFile(destination, blob, 'base64')
}

export default generateFormulaImage
