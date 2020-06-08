const canDeployUnits = (mana, cards) =>
  cards.filter(
    card =>
      (card.type === 'unit' || ['N2', 'S24', 'F8'].includes(card.id)) &&
      card.mana <= mana
  ).length > 0

export default canDeployUnits
