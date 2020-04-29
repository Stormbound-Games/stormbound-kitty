import resolveCardForLevel from './resolveCardForLevel'

const setEqualLevels = deck => deck.map(card => ({ ...card, level: 1 }))

export default (deck, modifier, equalLevels) => {
  const fullDeck = equalLevels
    ? setEqualLevels(deck.map(card => resolveCardForLevel(card)))
    : deck.map(card => resolveCardForLevel(card))

  switch (modifier) {
    case '1':
      return fullDeck.map(card =>
        card.type === 'structure'
          ? { ...card, mana: 2, costReduced: card.mana > 2 ? true : false }
          : card
      )
    case '2':
      return fullDeck.map(card =>
        card.race === 'toad' && card.type === 'unit'
          ? { ...card, mana: 2, costReduced: card.mana > 2 ? true : false }
          : card
      )
    case '3':
      // Knights, avoid Summon Militia
      return fullDeck.map(card =>
        card.race === 'knight' && card.type === 'unit'
          ? {
              ...card,
              mana: Math.max(0, card.mana - 2),
              costReduced: card.mana > 0 ? true : false,
            }
          : card
      )
    case '4':
      return fullDeck.map(card =>
        card.race === 'dwarf' && card.type === 'unit'
          ? {
              ...card,
              mana: Math.max(0, card.mana - 2),
              costReduced: card.mana > 0 ? true : false,
            }
          : card
      )
    case '5':
      return fullDeck.map(card =>
        card.type === 'spell'
          ? {
              ...card,
              mana: Math.max(0, card.mana - 2),
              costReduced: card.mana > 0 ? true : false,
            }
          : card
      )
    case '0':
    default:
      return fullDeck
  }
}
