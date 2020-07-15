import capitalise from '../capitalise'
import getRawCardData from '../getRawCardData'
import { CATEGORIES } from '../../constants/decks'
import { BRAWLS } from '../../constants/brawl'

const getDeckSearchDescription = state => {
  const cardData = getRawCardData(state.including)
  const brawl = BRAWLS.find(brawl => brawl.id === state.brawl)

  return [
    'Find a collection of',
    state.faction !== '*' ? capitalise(state.faction) : '',
    'decks',
    state.including ? `including ${cardData.name}` : '',
    state.category === '*' || state.category === 'REGULAR'
      ? 'for all levels and all play-styles'
      : `for ${CATEGORIES[state.category]}`,
    brawl ? `(${brawl.label})` : '',
    'suggested by',
    state.author !== '*' ? state.author : 'the Stormbound community',
  ]
    .filter(Boolean)
    .join(' ')
}

export default getDeckSearchDescription
