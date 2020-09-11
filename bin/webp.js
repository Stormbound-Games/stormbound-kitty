const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

const webp = imageminWebp({ quality: 100 })
const paths = [
  'public/assets/images',
  'public/assets/images/books',
  'public/assets/images/card',
  'public/assets/images/cards',
  'public/assets/images/guides',
  'public/assets/images/iconography',
  'public/assets/images/puzzles',
  'public/assets/images/releases',
  'public/assets/images/sim',
  'public/assets/images/wallpapers',
]

Promise.all(
  paths.map(path =>
    imagemin([`${path}/*.{jpg,png}`], { destination: path, plugins: [webp] })
  )
).then(() => console.log('Images optimized'))
