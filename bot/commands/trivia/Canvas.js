import canvas from 'canvas'
import Discord from 'discord.js'

const random = (min, max) => min + Math.random() * (max - min)

export default class Canvas {
  constructor() {
    this.canvas = canvas.createCanvas(150, 150)
    this.context = this.canvas.getContext('2d')

    // This is the percentage of the image around the edges we do not want to
    // crop in to avoid having mostly padding.
    this.boundary = 18
    this.cropSize = 50
    this.difficulty = null
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty
  }

  loadImage(fileName) {
    return canvas.loadImage(fileName)
  }

  getAttachment(fileName, multiplier = 1) {
    return this.loadImage(fileName).then(image =>
      this.createAttachment(image, multiplier)
    )
  }

  createAttachment(image, multiplier = 1) {
    // The multiplier is used to zoom out at half time if the image has not
    // been found yet.
    const crop = this.cropSize * multiplier

    // The top-left corner of the image should be computed randomly between
    // the top-left boundary and the bottom right boundary. For a 300x300
    // image, it gives a range of 60 to 240 pixels with a 20% boundary. If the
    // crop center has already been defined however, the top-left corner is
    // computed from the focal point, minus half the crop size on both axis.
    const startX = this.cropCenter
      ? this.cropCenter[0] - crop / 2
      : random(
          (image.width * this.boundary) / 100,
          image.width - (image.width * this.boundary) / 100 - crop
        )
    const startY = this.cropCenter
      ? this.cropCenter[1] - crop / 2
      : random(
          (image.height * this.boundary) / 100,
          image.height - (image.height * this.boundary) / 100 - crop
        )

    // If there is no image focal point just, define the coordinates of the
    // center of the crop area so the zoom out can be focused on the exact
    // same point.
    if (!this.cropCenter) {
      this.cropCenter = [startX + crop / 2, startY + crop / 2]
    }

    const { width, height } = this.canvas
    const args = [image, startX, startY, crop, crop, 0, 0, width, height]

    this.context.clearRect(0, 0, width, height)
    this.context.drawImage(...args)

    if (this.difficulty === 'HARD') {
      this.context.putImageData(this.grayscale(), 0, 0)
    }

    return new Discord.MessageAttachment(
      this.canvas.toBuffer(),
      'trivia_img.png'
    )
  }

  grayscale() {
    const { width, height } = this.canvas
    const image = this.context.getImageData(0, 0, width, height)
    const pixels = image.data

    for (var i = 0; i < pixels.length; i += 4) {
      const lightness = parseInt(
        (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
      )

      pixels[i] = lightness
      pixels[i + 1] = lightness
      pixels[i + 2] = lightness
    }

    return image
  }
}
