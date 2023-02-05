import { getEntry } from '#helpers/sanity'
import getCards from '#api/cards/getCards'
import getReleases from '#api/releases/getReleases'

const getSiteSettings = async ({ isPreview, cards } = {}) => {
  if (!cards) cards = await getCards({ isPreview })
  const lastReleases = await getReleases({
    fields: 'date, title, "slug": slug.current, id',
    limit: 3,
    isPreview,
  })
  const siteSettings = await getEntry({
    conditions: ['_type == "siteSettings"'],
    fields: `_updatedAt, eyeCatcher, "eyeCatcherText": pt::text(eyeCatcher)`,
    options: { isPreview },
  })

  // This is a little awkward: there seems to be no way to empty a portable text
  // field. Once filled at least once, it will always contain at least one empty
  // block. So we need to serialize it to see if there is ultimately some text
  // to render.
  const eyeCatcher =
    siteSettings?.eyeCatcherText.length > 0
      ? { content: siteSettings.eyeCatcher, id: siteSettings._updatedAt }
      : null

  return {
    lastReleases,
    eyeCatcher,
    cards: cards.map(cleanUpCard),
    isPreview,
  }
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
