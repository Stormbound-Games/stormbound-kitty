import getResolvedCardData from '~/helpers/getResolvedCardData'

const sortByMana = cardsIndex => (a, b) => {
  if (!a) return +1
  if (!b) return -1

  const cardA = getResolvedCardData(cardsIndex, {
    token: a.token,
    id: a.id,
    level: a.level,
  })
  const cardB = getResolvedCardData(cardsIndex, {
    token: b.token,
    id: b.id,
    level: b.level,
  })

  if (+cardA.mana > +cardB.mana) return +1
  if (+cardA.mana < +cardB.mana) return -1

  if (cardA.name > cardB.name) return +1
  if (cardA.name < cardB.name) return -1
}

export default sortByMana
