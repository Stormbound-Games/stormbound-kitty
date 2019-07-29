import { deserialiseDeck } from './deserialise'

export default deck => {
  if (!deck) {
    return []
  }

  const decodedData = decodeURIComponent(deck)

  return deserialiseDeck(decodedData)
}
