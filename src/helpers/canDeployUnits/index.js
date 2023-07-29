const isSummoningSpell = card =>
  [
    'N2' /* Summon Militia */,
    'S24' /* Head Start */,
    'F8' /* Rain of Frogs */,
  ].includes(card.id)

const canDeployUnits = (mana, cards) =>
  cards
    .filter(card => card.type === 'unit' || isSummoningSpell(card))
    .filter(card => card.mana <= mana).length > 0

export default canDeployUnits
