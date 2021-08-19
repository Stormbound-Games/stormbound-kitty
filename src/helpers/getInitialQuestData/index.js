import serialisation from '~/helpers/serialisation'

const getInitialQuestData = quest => {
  if (!quest) {
    return {}
  }

  const decodedData = decodeURIComponent(quest)

  return serialisation.quest.deserialise(decodedData)
}

export default getInitialQuestData
