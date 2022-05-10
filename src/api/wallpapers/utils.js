export const FIELDS = `
"id": _id,
device,
"image": image.asset -> url,
"extension": image.asset -> extension,
"dimensions": {
  "width": image.asset -> metadata.dimensions.width,
  "height": image.asset -> metadata.dimensions.height,
  "aspectRatio": image.asset -> metadata.dimensions.aspectRatio,
}
`
