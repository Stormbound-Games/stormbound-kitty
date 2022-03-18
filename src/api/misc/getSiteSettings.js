import { getEntry } from '~/helpers/sanity'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

const getSiteSettings = async ({ isPreview } = {}) => {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const siteSettings = await getEntry({
    conditions: ['_type == "siteSettings"'],
    fields: `_updatedAt, eyeCatcher`,
    options: { isPreview },
  })

  const eyeCatcher = siteSettings?.eyeCatcher
    ? { content: siteSettings?.eyeCatcher, id: siteSettings._updatedAt }
    : null

  return { navigation, eyeCatcher, cards }
}

export default getSiteSettings
