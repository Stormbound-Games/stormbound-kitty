import { deserialiseCard } from './deserialise'

export default card => {
  if (!card) {
    return {}
  }

  const decodedData = decodeURIComponent(card)

  return deserialiseCard(decodedData)
}
