import getRawCardData from '~/helpers/getRawCardData'
import serialization from '~/helpers/serialization'

const useVersionedCardData = (props, versionId) => {
  if (!versionId || props.versions.length === 0) return props.card

  const cardData = props.versions
    .filter(version => version.timestamp >= versionId)
    .reduce(
      (acc, version) => ({ ...acc, ...version.from }),
      getRawCardData(props.cardId)
    )

  return serialization.card.deserialize(serialization.card.serialize(cardData))
}

export default useVersionedCardData
