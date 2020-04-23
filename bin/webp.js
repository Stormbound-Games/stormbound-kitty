const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

const webp = imageminWebp({ quality: 100 })
const paths = [
  'public/assets/images',
  'public/assets/images/cards',
  'public/assets/images/puzzles',
]

Promise.all(
  paths.map(path =>
    imagemin([`${path}/*.{jpg,png}`], { destination: path, plugins: [webp] })
  )
).then(() => console.log('Images optimized'))
