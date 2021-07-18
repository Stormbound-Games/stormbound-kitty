import isSuggestedDeck from '../isSuggestedDeck'

const getDeckPresets = deck => {
  const suggestedDeck = isSuggestedDeck(deck)
  const presetOptions = { modifier: 'NONE', equals: false }

  if (!suggestedDeck) return presetOptions

  if (suggestedDeck.tags.includes('BRAWL')) {
    presetOptions.modifier = suggestedDeck.brawl
  } else if (suggestedDeck.tags.includes('EQUALS')) {
    presetOptions.equals = true
  }

  return presetOptions
}

export default getDeckPresets
