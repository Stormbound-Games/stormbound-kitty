export const FIELDS = `
"id": _id,
device,
"image": image { "url": asset -> url }.url,
"extension": image.asset -> extension,
"dimensions": (image {
  "asset": (asset -> {
    "metadata": (metadata {
      "dimensions": (dimensions { width, height, aspectRatio })
    }).dimensions
  }).metadata
}).asset
`
