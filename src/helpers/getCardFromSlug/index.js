import cards from '../../data/cards'
import getRawCardData from '../getRawCardData'

const slugify = name =>
  name.replace(/\s/g, '_').replace(/[’',]/g, '').toLowerCase()

const slugIndex = cards.reduce(
  (acc, card) => ({ ...acc, [slugify(card.name)]: card }),
  {}
)

const getCardFromSlug = slug =>
  slugIndex[slug.toLowerCase()] || getRawCardData(slug)

export default getCardFromSlug
