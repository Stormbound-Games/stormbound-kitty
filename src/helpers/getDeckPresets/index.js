import { BRAWL_INDEX } from '~/constants/brawl'

const BRAWLS = Object.keys(BRAWL_INDEX)

const getDeckPresets = suggestedDeck => {
  const presetOptions = { modifier: 'NONE', equals: false }

  if (!suggestedDeck) return presetOptions

  const tags = suggestedDeck.tags || []
  const brawl = tags.find(tag => BRAWLS.includes(tag))

  if (brawl) {
    presetOptions.modifier = brawl
  }

  if (tags.includes('EQUALS')) {
    presetOptions.equals = true
  }

  return presetOptions
}

export default getDeckPresets
