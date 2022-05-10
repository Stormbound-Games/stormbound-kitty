import { getEntries } from '~/helpers/sanity'

const FIELDS = `
"id": _id,
name,
"image": image.asset -> url,
"dimensions": {
  "width": image.asset -> metadata.dimensions.width,
  "height": image.asset -> metadata.dimensions.height,
}
`

const getAvatars = async ({ isPreview } = {}) => {
  const avatars = await getEntries({
    conditions: ['_type == "avatar"'],
    fields: FIELDS,
    options: { order: 'name asc', isPreview },
  })

  return avatars
}

export default getAvatars
