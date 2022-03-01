import { getEntries } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getWallpapersFromType = async ({ type, isPreview } = {}) => {
  const wallpapers = await getEntries({
    conditions: ['_type == "wallpaper"', 'device == $type'],
    params: { type },
    fields: FIELDS,
    options: { isPreview },
  })

  return wallpapers
}

export default getWallpapersFromType
