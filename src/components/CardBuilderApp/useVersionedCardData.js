import getRawCardData from '~/helpers/getRawCardData'
import parseDate from '~/helpers/parseDate'
import serialisation from '~/helpers/serialisation'

const useVersionedCardData = (props, versionId) => {
  if (!versionId || props.versions.length === 0) return props.card

  const cardData = props.versions
    .filter(version => parseDate(version.date) >= +versionId)
    .reduce(
      (acc, version) => ({ ...acc, ...version.from }),
      getRawCardData(props.cardId)
    )

  return serialisation.card.deserialise(serialisation.card.serialise(cardData))
}

export default useVersionedCardData
