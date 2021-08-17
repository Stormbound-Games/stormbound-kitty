import formatCardStats from '~/helpers/formatCardStats'
import getRawCardData from '~/helpers/getRawCardData'

const isIncomplete = state => {
  if (!state.name) return true
  if (!state.mana.display && state.mana.display !== 0) return true
  if (state.type === 'unit' && !state.strength.display) return true
  if (state.type === 'unit' && typeof state.movement !== 'number') return true
  return false
}

const getCardBuilderMetaTags = state => {
  const cardData = getRawCardData(state.imageCardId)
  const metaTags = {}

  metaTags.title = state.name || cardData.name || 'Card Builder'

  if (isIncomplete(state)) {
    metaTags.description = 'Create your own Stormbound card'
  } else {
    metaTags.description = formatCardStats(state)
  }

  if (state.imageURL) {
    metaTags.image = state.imageURL
  } else if (cardData) {
    metaTags.image = '/assets/images/cards/' + cardData.image
  }

  return metaTags
}

export default getCardBuilderMetaTags
