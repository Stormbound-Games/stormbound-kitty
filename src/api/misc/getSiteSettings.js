import { getEntry } from '~/helpers/sanity'
import getNavigation from '~/helpers/getNavigation'

const getSiteSettings = async ({ isPreview } = {}) => {
  const navigation = await getNavigation({ isPreview })
  const siteSettings = await getEntry({
    conditions: ['_type == "siteSettings"'],
    options: { isPreview },
  })
  const eyeCatcher = siteSettings?.eyeCatcher
    ? { content: siteSettings?.eyeCatcher, id: siteSettings._updatedAt }
    : null

  return { navigation, eyeCatcher }
}

export default getSiteSettings
