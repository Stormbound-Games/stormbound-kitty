import { CardsContext } from '~/helpers/CardsProvider'
import serialization from '~/helpers/serialization'

const useVersionedCardData = (props, versionId) => {
  const { cardsIndex } = React.useContext(CardsContext)
  if (!versionId || props.versions.length === 0) return props.card

  const cardData = props.versions
    .filter(version => version.timestamp >= versionId)
    .reduce(
      (acc, version) => ({ ...acc, ...version.from }),
      cardsIndex[props.cardId]
    )

  return serialization.card.deserialize(
    cardsIndex,
    serialization.card.serialize(cardData)
  )
}

export default useVersionedCardData
