import CARDS from '~/data/cards'
import getRawCardData from '~/helpers/getRawCardData'

const slugify = name =>
  name.replace(/\s/g, '_').replace(/[’',]/g, '').toLowerCase()

const SLUGS_INDEX = CARDS.reduce(
  (acc, card) => ({ ...acc, [slugify(card.name)]: card }),
  {}
)

const getCardFromSlug = slug => {
  if (slug.toLowerCase() in SLUGS_INDEX) {
    return SLUGS_INDEX[slug.toLowerCase()]
  }

  const card = getRawCardData(slug.toUpperCase())

  return card.id ? card : undefined
}

export default getCardFromSlug
