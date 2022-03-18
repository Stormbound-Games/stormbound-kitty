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

  return { navigation, eyeCatcher, cards: cards.map(cleanUpCard) }
}

// The codebase should be resilient to absence of value for properties which
// are falsy (as in, it never checkes for `null` or `false` explicitly). So by
// removing all falsy (non-0) fields, we can save a few kilobytes from the Next
// page data.
const cleanUpCard = card => {
  for (const property in card) {
    if (card[property] === null || card[property] === false)
      delete card[property]
  }

  return card
}

export default getSiteSettings
