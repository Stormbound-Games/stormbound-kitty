import { deserialiseQuest } from './deserialise'

export default card => {
  if (!card) {
    return {}
  }

  const decodedData = decodeURIComponent(card)

  return deserialiseQuest(decodedData)
}
