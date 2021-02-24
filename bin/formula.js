const { writeFileSync } = require('fs')
const MathJax = require('mathjax-node')
const svg2png = require('svg2png')

const convert = (result, { scale = 1, ex = 6 }, callback) => {
  result.pngWidth =
    result.width.substring(0, result.width.length - 2) * ex * scale

  const buffer = new Buffer(result.svg, 'utf-8')
  const buff = svg2png.sync(buffer, { width: result.pngWidth })

  result.png = 'data:image/png;base64,' + buff.toString('base64')

  callback(result)
}

const typeset = (data, callback) => {
  const svg = data.svg
  if (data.png) data.svg = true
  MathJax.typeset(data, result => {
    data.svg = svg
    if (result.error) callback(result)
    if (data.png) convert(result, data, callback)
    else callback(result, data)
  })
}

MathJax.config({
  displayMessages: true,
  displayErrors: true,
  undefinedCharError: true,
  extensions: 'TeX/autoload-all.js,TeX/color.js',
})

MathJax.start()

typeset(
  {
    math:
      "\\color{beige}S'_A = S_A + K * (W - \\frac{1}{1+10^{(S_B-S_A)/400}})",
    format: 'TeX',
    png: true,
    scale: 1,
    ex: 60,
  },
  function (data) {
    if (!data.errors) {
      writeFileSync(
        'formula.png',
        data.png.replace('data:image/png;base64,', ''),
        'base64'
      )
    } else {
      console.log(data.errors)
    }
  }
)
