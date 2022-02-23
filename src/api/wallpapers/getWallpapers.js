import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getWallpapers = async ({ isPreview } = {}) => {
  const wallpapers = await getEntries({
    conditions: ['_type == "wallpaper"'],
    fields: `..., image { asset -> { ... } }`,
    options: { order: 'device asc', isPreview },
  })

  return wallpapers.map(clean)
}

export default getWallpapers
