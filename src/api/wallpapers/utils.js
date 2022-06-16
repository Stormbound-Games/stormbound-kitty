export const FIELDS = `
"id": _id,
device,
"image": image.asset -> url,
"extension": image.asset -> extension,
"dimensions": image.asset -> {
  "width": metadata.dimensions.width,
  "height": metadata.dimensions.height,
  "aspectRatio": metadata.dimensions.aspectRatio,
}
`
