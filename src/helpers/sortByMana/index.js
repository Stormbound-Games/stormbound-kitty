const sortByMana = cardsIndex => (a, b) => {
  if (!a) return +1
  if (!b) return -1

  const cardA = cardsIndex[a.id]
  const cardB = cardsIndex[b.id]

  if (!cardA) return +1
  if (!cardB) return -1

  if (cardA.mana > cardB.mana) return +1
  if (cardA.mana < cardB.mana) return -1

  if (cardA.name > cardB.name) return +1
  if (cardA.name < cardB.name) return -1

  return 0
}

export default sortByMana
