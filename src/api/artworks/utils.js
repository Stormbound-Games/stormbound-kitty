import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
"user": user -> { name, "slug": slug.current },
date,
"card": card -> id.current,
"image": image.asset -> url,
"dimensions": image.asset -> {
  "width": metadata.dimensions.width,
  "height": metadata.dimensions.height,
  "aspectRatio": metadata.dimensions.aspectRatio,
}
`

export const MAPPER = artwork => {
  artwork.date = serializeDate(artwork.date)

  return artwork
}
