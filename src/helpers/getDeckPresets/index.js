const getDeckPresets = (brawls, suggestedDeck) => {
  const presetOptions = { modifier: 'NONE', equals: false }

  if (!suggestedDeck) return presetOptions

  const brawlIds = brawls.map(brawl => brawl.id)
  const tags = suggestedDeck.tags || []
  const brawl = tags.find(tag => brawlIds.includes(tag))

  if (brawl) {
    presetOptions.modifier = brawl
  }

  if (tags.includes('EQUALS')) {
    presetOptions.equals = true
  }

  return presetOptions
}

export default getDeckPresets
