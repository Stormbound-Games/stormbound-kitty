import { deserialiseCard } from './deserialise'
import { serialiseCardFromCollection } from './serialise'
import getCardFromSlug from './getCardFromSlug'

export default card => {
  if (!card) {
    return {}
  }

  const isExistingCard = getCardFromSlug(card)

  if (isExistingCard) {
    return deserialiseCard(serialiseCardFromCollection(isExistingCard.id))
  }

  const decodedData = decodeURIComponent(card)

  return deserialiseCard(decodedData)
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
