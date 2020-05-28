import getDeckAdvice from '../../helpers/getDeckAdvice'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import serialisation from '../../helpers/serialisation'

const getIdFromURL = url =>
  url
    .replace('https://stormbound-kitty.com/deck/', '')
    .replace('/detail', '')
    .replace('/dry-run', '')

export default content => {
  const id = getIdFromURL(content.replace('!deckadvice', '').trim())

  if (id.length === 0) return

  try {
    const cards = serialisation.deck.deserialise(id).map(getResolvedCardData)

    return (
      'Some comments and possible suggestions about your deck:\n' +
      getDeckAdvice(cards)
        .map(advice => `- **${advice.name}:** ${advice.description}`)
        .join('\n')
    )
  } catch (error) {}
}
