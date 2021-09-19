import serialization from '~/helpers/serialization'

const getInitialQuestData = quest => {
  if (!quest) {
    return {}
  }

  const decodedData = decodeURIComponent(quest)

  return serialization.quest.deserialize(decodedData)
}

export default getInitialQuestData
