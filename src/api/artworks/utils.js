import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
"user": user -> { name, "slug": slug.current },
date,
"image": image { "url": asset -> url }.url,
"dimensions": (image {
  "asset": (asset -> {
    "metadata": (metadata {
      "dimensions": (dimensions { width, height })
    }).dimensions
  }).metadata
}).asset
`

export const MAPPER = artwork => {
  artwork.date = serializeDate(artwork.date)
  return artwork
}
