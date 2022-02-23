import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getWallpapersFromType = async ({ type, isPreview } = {}) => {
  const wallpapers = await getEntries({
    conditions: ['_type == "wallpaper"', 'device == $type'],
    params: { type },
    fields: `..., image { asset -> { ... } }`,
    options: { isPreview },
  })

  return wallpapers.map(clean)
}

export default getWallpapersFromType
