import { getEntries } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getWallpapers = async ({ isPreview } = {}) => {
  const wallpapers = await getEntries({
    conditions: ['_type == "wallpaper"'],
    fields: FIELDS,
    options: { order: 'device asc', isPreview },
  })

  return wallpapers
}

export default getWallpapers
