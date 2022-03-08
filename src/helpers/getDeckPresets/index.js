const getDeckPresets = (brawls, suggestedDeck) => {
  const presetOptions = { modifier: 'NONE', equals: false }

  if (!suggestedDeck) return presetOptions

  const brawlIds = brawls.map(brawl => brawl.id)
  const tagSlugs = (suggestedDeck.tags || []).map(tag => tag.slug)
  const brawl = tagSlugs.find(tag => brawlIds.includes(tag))

  if (brawl) {
    presetOptions.modifier = brawl
  }

  if (tagSlugs.includes('EQUALS')) {
    presetOptions.equals = true
  }

  return presetOptions
}

export default getDeckPresets
