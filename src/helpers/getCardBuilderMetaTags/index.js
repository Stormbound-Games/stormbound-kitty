import formatCardStats from '~/helpers/formatCardStats'

const isIncomplete = state => {
  if (!state.name) return true
  if (!state.mana?.display && state.mana?.display !== 0) return true
  if (
    state.type === 'unit' &&
    (!state.strength?.display || typeof state.movement !== 'number')
  )
    return true
  return false
}

const getCardBuilderMetaTags = (cardsIndex, state) => {
  const metaTags = {
    title: state.name || 'Card Builder',
  }

  if (isIncomplete(state)) {
    metaTags.description = 'Create your own Stormbound card'
  } else {
    metaTags.description = formatCardStats(state)
  }

  if (state.imageURL) {
    metaTags.image = state.imageURL
  } else if (state.imageCardId in cardsIndex) {
    metaTags.image = cardsIndex[state.imageCardId].image
  }

  return metaTags
}

export default getCardBuilderMetaTags
