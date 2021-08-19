import serialisation from '~/helpers/serialisation'
import getCardFromSlug from '~/helpers/getCardFromSlug'
import getRawCardData from '~/helpers/getRawCardData'

const getInitialCardData = card => {
  if (!card) {
    return {}
  }

  const officialCard = getCardFromSlug(card)

  if (officialCard) {
    // Go through the serialisation on the official card data as it deals with
    // normalisation and resolution of properties like mana, strength and image.
    return serialisation.card.deserialise(
      serialisation.card.serialise(getRawCardData(officialCard.id))
    )
  }

  const decodedData = decodeURIComponent(card)

  return serialisation.card.deserialise(decodedData)
}

export const getInitialCardDataFromQuery = () => {
  const params = new URLSearchParams(window.location.search)
  const state = {}

  if (window.location.search === '' || window.location.search === '?') {
    return {}
  }

  state.name = decodeURIComponent(params.get('name') || '')
  state.ability = decodeURIComponent(params.get('ability') || '')
  state.hero = params.get('hero') === 'true' || +params.get('hero') === 1
  state.elder = params.get('elder') === 'true' || +params.get('elder') === 1
  state.movement = params.get('movement') ? +params.get('movement') : undefined
  state.rarity = (params.get('rarity') || '').toLowerCase()
  state.type = (params.get('type') || '').toLowerCase()
  state.faction = (params.get('faction') || '').toLowerCase()
  state.race = (params.get('race') || '').toLowerCase()
  state.strength = params.get('strength')
    ? params.get('strength').toLowerCase()
    : undefined
  state.mana = (params.get('mana') || '').toLowerCase()

  return state
}

export default getInitialCardData
