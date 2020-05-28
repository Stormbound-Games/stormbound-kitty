import getDeckAdvice from '../../helpers/getDeckAdvice'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import serialisation from '../../helpers/serialisation'

const getIdFromURL = url =>
  url
    .replace('https://stormbound-kitty.com/deck/', '')
    .replace('/detail', '')
    .replace('/dry-run', '')

export default search => {
  const id = getIdFromURL(search)

  if (id.length === 0) return

  try {
    const cards = serialisation.deck.deserialise(id).map(getResolvedCardData)
    const advice = getDeckAdvice(cards)

    if (advice.length === 0) {
      return 'Nothing too particular to mention about your deck, it looks alright!'
    }

    return (
      'Some comments and possible suggestions about your deck:\n' +
      advice
        .map(advice => `- **${advice.name}:** ${advice.description}`)
        .join('\n')
    )
  } catch (error) {}
}
