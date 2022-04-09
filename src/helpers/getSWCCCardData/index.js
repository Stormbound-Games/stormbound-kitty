import serialization from '~/helpers/serialization'

const getSWCCCardData = (cardsIndex, id) => {
  const data = serialization.card.deserialize(cardsIndex, id)

  data.image = cardsIndex[data.imageCardId]?.image ?? data.imageURL
  data.strength = data.strength.values[0]
  data.mana = data.mana.values[0]
  data.ability = data.ability.values[0]
  data.level = 1

  return data
}

export default getSWCCCardData
