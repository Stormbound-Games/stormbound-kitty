import serialisation from '~/helpers/serialisation'

export default quest => {
  if (!quest) {
    return {}
  }

  const decodedData = decodeURIComponent(quest)

  return serialisation.quest.deserialise(decodedData)
}
