const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

Promise.all([
  imagemin(['public/assets/images/*.{jpg,png}'], 'public/assets/images', {
    use: [imageminWebp({ quality: 50 })]
  }),
  imagemin(
    ['public/assets/images/cards/*.{jpg,png}'],
    'public/assets/images/cards',
    {
      use: [imageminWebp({ quality: 50 })]
    }
  ),
  imagemin(
    ['public/assets/images/puzzles/*.{jpg,png}'],
    'public/assets/images/puzzles',
    {
      use: [imageminWebp({ quality: 50 })]
    }
  )
]).then(() => {
  console.log('Images optimized')
})
