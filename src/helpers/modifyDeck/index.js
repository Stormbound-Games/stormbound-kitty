import getResolvedCardData from '#helpers/getResolvedCardData'

const setToLevel1 = card => ({
  ...card,
  // If the card doesn’t have a concept of level (i.e. “pure” token), preserve
  // its level as it may contain strength information that cannot be resolved
  // otherwise.
  level: card.withoutLevel ? card.level : 1,
})

const modifyDeck = (cardsIndex, deck, modifier, equalsMode) => {
  const fullDeck = equalsMode
    ? deck.map(setToLevel1).map(card => getResolvedCardData(cardsIndex, card))
    : deck.map(card => getResolvedCardData(cardsIndex, card))

  switch (modifier) {
    case 'DWARF_MANA':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('dwarf')) return card
        return {
          ...card,
          mana: Math.max(0, card.mana - 2),
          manaDecreased: card.mana > 0,
        }
      })
    case 'PIRATE_MANA':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('pirate')) return card
        return {
          ...card,
          mana: Math.max(0, card.mana - 2),
          manaDecreased: card.mana > 0,
        }
      })
    case 'STRUCTURE_MANA':
      return fullDeck.map(card => {
        if (card.type !== 'structure') return card
        return {
          ...card,
          mana: 2,
          manaDecreased: card.mana > 2,
          manaIncreased: card.mana < 2,
        }
      })
    case 'SPELL_MANA':
      return fullDeck.map(card => {
        if (card.type !== 'spell') return card
        return {
          ...card,
          mana: Math.max(0, card.mana - 2),
          manaDecreased: card.mana > 0,
        }
      })
    case 'TOAD_MANA':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('toad')) return card
        return {
          ...card,
          mana: 2,
          manaDecreased: card.mana > 2,
          manaIncreased: card.mana < 2,
        }
      })
    case 'KNIGHT_MANA':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('knight')) return card
        return {
          ...card,
          mana: Math.max(0, card.mana - 2),
          manaDecreased: card.mana > 0,
        }
      })
    case 'RAVEN_MOVEMENT':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('raven')) return card
        return { ...card, movement: card.movement + 1, movementIncreased: true }
      })
    case 'PIRATE_MOVEMENT':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('pirate')) return card
        return {
          ...card,
          movement: 2,
          movementIncreased: card.movement < 2,
          movementDecreased: card.movement > 2,
        }
      })
    case 'SATYR_MOVEMENT':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('satyr')) return card
        return { ...card, movement: card.movement + 1, movementIncreased: true }
      })
    case 'CONSTRUCT_MOVEMENT':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('construct')) return card
        return {
          ...card,
          movement: 2,
          movementIncreased: card.movement < 2,
          movementDecreased: card.movement > 2,
        }
      })
    case 'DRAGON_MOVEMENT':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('dragon')) return card
        return { ...card, movement: card.movement + 1, movementIncreased: true }
      })
    case 'RODENT_STRENGTH':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('rodent')) return card
        return { ...card, strength: card.strength + 3, strengthIncreased: true }
      })
    case 'FELINE_STRENGTH':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('feline')) return card
        return { ...card, strength: card.strength + 2, strengthIncreased: true }
      })
    case 'FROSTLING_STRENGTH':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('frostling')) return card
        return { ...card, strength: card.strength + 4, strengthIncreased: true }
      })
    case 'ELDER_STRENGTH':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('elder')) return card
        return { ...card, strength: card.strength + 3, strengthIncreased: true }
      })
    case 'UNDEAD_STRENGTH':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('undead')) return card
        return { ...card, strength: card.strength + 2, strengthIncreased: true }
      })
    case 'HERO_STRENGTH':
      return fullDeck.map(card => {
        if (!card.unitTypes.includes('hero')) return card
        return { ...card, strength: card.strength + 3, strengthIncreased: true }
      })

    case 'NONE':
    default:
      return fullDeck
  }
}

export default modifyDeck
