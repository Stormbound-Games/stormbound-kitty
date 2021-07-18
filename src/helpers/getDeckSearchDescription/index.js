import capitalise from '../capitalise'
import getRawCardData from '../getRawCardData'
import toSentence from '../toSentence'
import { TAGS } from '../../constants/deck'

const getDeckSearchDescription = (state = {}) => {
  const cardData = getRawCardData(state.including)
  const tags = state.tags || []
  const author = state.author || '*'

  return [
    'Find a collection of',
    state.faction !== '*' ? capitalise(state.faction) : '',
    'decks',
    state.including ? `including ${cardData.name}` : '',
    tags.length === 0
      ? 'for all levels and all play-styles'
      : `tagged with ${toSentence(
          tags.map(tag => TAGS[tag] || tag),
          'and'
        )}`,
    'suggested by',
    author !== '*' ? author : 'the Stormbound community',
  ]
    .filter(Boolean)
    .join(' ')
}

export default getDeckSearchDescription
