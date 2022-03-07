import { TAGS } from '~/constants/deck'
import capitalize from '~/helpers/capitalize'
import toSentence from '~/helpers/toSentence'

const getDeckSearchDescription = (
  // Default to the base tags (without the Brawl ones), in case available tags
  // are not passed.
  availableTags = TAGS,
  cardsIndex = {},
  state = {}
) => {
  const cardData = cardsIndex[state.including] || {}
  const tags = state.tags || []
  const author = state.author || '*'

  return [
    'Find a collection of',
    state.faction !== '*' ? capitalize(state.faction) : '',
    'decks',
    state.including ? `including ${cardData.name}` : '',
    tags.length === 0
      ? 'for all levels and all play-styles'
      : `tagged with ${toSentence(
          tags.map(tag => availableTags[tag] || tag),
          'and'
        )}`,
    'suggested by',
    author !== '*' ? author : 'the Stormbound community',
  ]
    .filter(Boolean)
    .join(' ')
}

export default getDeckSearchDescription
