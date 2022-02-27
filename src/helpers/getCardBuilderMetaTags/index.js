import formatCardStats from '~/helpers/formatCardStats'
import { formatPreciseDate } from '~/helpers/formatDate'

const isIncomplete = state => {
  if (!state.name) return true
  if (!state.mana.display && state.mana.display !== 0) return true
  if (state.type === 'unit' && !state.strength.display) return true
  if (state.type === 'unit' && typeof state.movement !== 'number') return true
  return false
}

const getCardBuilderMetaTags = (cardsIndex, state, versionId) => {
  const cardData = cardsIndex[state.imageCardId]
  const metaTags = {}

  // If the card is a past version of an official card, mention it in the page
  // title so it shows up in embeds, such as on Discord. Otherwise, nothing
  // indicates that the thumbnail and its stats are from a former version of the
  // card.
  if (versionId && cardData) {
    metaTags.metaTitle =
      cardData.name + ' (prior ' + formatPreciseDate(new Date(versionId)) + ')'
  }

  metaTags.title = state.name || cardData?.name || 'Card Builder'

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
