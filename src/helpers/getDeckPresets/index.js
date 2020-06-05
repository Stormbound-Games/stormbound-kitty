import isSuggestedDeck from '../isSuggestedDeck'

const getDeckPresets = deck => {
  const suggestedDeck = isSuggestedDeck(deck)
  const presetOptions = { modifier: 'NONE', equals: false }

  if (!suggestedDeck) return presetOptions

  if (suggestedDeck.category === 'BRAWL') {
    presetOptions.modifier = suggestedDeck.brawl
  } else if (suggestedDeck.category === 'EQUALS') {
    presetOptions.equals = true
  }

  return presetOptions
}

export default getDeckPresets
