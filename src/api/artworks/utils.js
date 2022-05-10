import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
"user": user -> { name, "slug": slug.current },
date,
"card": card -> id.current,
"image": image.asset -> url,
"dimensions": {
  "width": image.asset -> metadata.dimensions.width,
  "height": image.asset -> metadata.dimensions.height,
  "aspectRatio": image.asset -> metadata.dimensions.aspectRatio,
}
`

export const MAPPER = artwork => {
  artwork.date = serializeDate(artwork.date)

  return artwork
}
