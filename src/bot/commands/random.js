import cards from '../../data/cards'
import { FACTIONS, RACES, RARITIES, TYPES } from '../../constants/game'
import arrayRandom from '../../helpers/arrayRandom'

const linkify = card => 'https://stormbound-kitty.com/card/' + card.id

export default content => {
  const search = content.replace('!random', '').trim().toLowerCase()

  if (search.length === 0) return

  const ignoredTerms = []
  const searchTerms = search.split(/\s+/g).reduce((search, term) => {
    if (term === 'hero') search.hero = true
    else if (term === 'elder') search.elder = true
    else if (Object.keys(FACTIONS).includes(term)) search.faction = term
    else if (Object.keys(RACES).includes(term)) search.race = term
    else if (Object.keys(RARITIES).includes(term)) search.rarity = term
    else if (Object.keys(TYPES).includes(term)) search.type = term
    else {
      switch (term) {
        case 'struct':
          search.type = 'structure'
          break
        case 'ic':
        case 'red':
          search.faction = 'ironclad'
          break
        case 'sf':
        case 'green':
          search.faction = 'shadowfen'
          break
        case 'w':
        case 'wp':
        case 'blue':
          search.faction = 'winter'
          break
        case 'sw':
        case 'yellow':
          search.faction = 'swarm'
          break
        case 'n':
          search.faction = 'neutral'
          break
        default:
          ignoredTerms.push(term)
          break
      }
    }

    return search
  }, {})

  if (Object.keys(searchTerms).length === 0) return

  const results = cards
    .filter(card => !card.token)
    .filter(card => {
      if (searchTerms.hero && !card.hero) return false
      if (searchTerms.elder && !card.elder) return false
      if (searchTerms.faction && card.faction !== searchTerms.faction)
        return false
      if (searchTerms.type && card.type !== searchTerms.type) return false
      if (searchTerms.rarity && card.rarity !== searchTerms.rarity) return false
      if (searchTerms.race && card.race !== searchTerms.race) return false
      return true
    })

  if (results.length === 0) {
    return 'Meeooow… Sorry, I could not find a card matching this search term. :sob:'
  }

  const adjustSearch = search
    .split(/\s+/g)
    .map(search => (ignoredTerms.includes(search) ? `~~${search}~~` : search))
    .join(' ')

  return (
    linkify(arrayRandom(results)) +
    (ignoredTerms.length > 0 ? `\n*Search: ${adjustSearch}*` : '')
  )
}
