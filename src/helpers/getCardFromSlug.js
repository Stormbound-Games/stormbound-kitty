import cards from '../data/cards'

const slugify = name =>
  name.replace(/\s/g, '_').replace(/[’',]/g, '').toLowerCase()

const getCardFromSlug = slug =>
  cards.find(
    card => slugify(card.name) === slug.toLowerCase() || card.id === slug
  )

export default getCardFromSlug
