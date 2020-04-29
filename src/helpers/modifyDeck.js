export default (deck, modifier) => {
  switch (modifier) {
    case '1':
      return deck.map(card =>
        card.type === 'structure'
          ? { ...card, mana: 2, costReduced: card.mana > 2 ? true : false }
          : card
      )
    case '2':
      return deck.map(card =>
        card.race === 'toad' && card.type === 'unit'
          ? { ...card, mana: 2, costReduced: card.mana > 2 ? true : false }
          : card
      )
    case '3':
      // Knights, avoid Summon Militia
      return deck.map(card =>
        card.race === 'knight' && card.type === 'unit'
          ? {
              ...card,
              mana: Math.max(0, card.mana - 2),
              costReduced: card.mana > 0 ? true : false,
            }
          : card
      )
    case '4':
      return deck.map(card =>
        card.race === 'dwarf' && card.type === 'unit'
          ? {
              ...card,
              mana: Math.max(0, card.mana - 2),
              costReduced: card.mana > 0 ? true : false,
            }
          : card
      )
    case '5':
      return deck.map(card =>
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
      return deck
  }
}
