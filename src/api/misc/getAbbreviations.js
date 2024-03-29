import { getEntry } from '#helpers/sanity'
import getCards from '#api/cards/getCards'
import abbreviate from '#helpers/abbreviate'

const getAbbreviations = async ({
  isPreview,
  casing = 'NATURAL',
  cards,
} = {}) => {
  if (!cards) cards = await getCards({ isPreview })
  const siteSettings = await getEntry({
    conditions: ['_type == "siteSettings"'],
    fields: `"abbreviations": coalesce(abbreviations, [])`,
    options: { isPreview },
  })
  const abbreviations = {}

  cards
    // Remove all token cards before computing all the name abbreviations as
    // players tend not to know, care or abbreviate token card names.
    .filter(card => !card.token)
    .forEach(card => {
      const abbreviatedName = abbreviate(card.name)

      if (abbreviatedName.length === 1) return

      const key =
        casing === 'NATURAL' ? abbreviatedName : abbreviatedName.toLowerCase()

      if (typeof abbreviations[key] === 'undefined') {
        abbreviations[key] = []
      }

      abbreviations[key].push(card.name)
    })

  siteSettings.abbreviations.forEach(({ short, long }) => {
    const key = casing === 'NATURAL' ? short : short.toLowerCase()

    if (typeof abbreviations[key] === 'undefined') {
      abbreviations[key] = []
    }

    abbreviations[key].push(long)
  })

  return abbreviations
}

export default getAbbreviations
