export const FIELDS = `
_id,
device,
"image": image { "url": asset -> url }.url,
"dimensions": (image {
  "asset": (asset -> {
    "metadata": (metadata {
      "dimensions": (dimensions { width, height, aspectRatio })
    }).dimensions
  }).metadata
}).asset
`
