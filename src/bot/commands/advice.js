import getDeckAdvice from '../../helpers/getDeckAdvice'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import serialisation from '../../helpers/serialisation'

const getIdFromURL = url =>
  url
    .replace('https://stormbound-kitty.com/deck/', '')
    .replace('/detail', '')
    .replace('/dry-run', '')

export default content => {
  const id = getIdFromURL(content.replace('!advice', '').trim())

  if (id.length === 0) return

  try {
    const cards = serialisation.deck.deserialise(id).map(getResolvedCardData)

    return getDeckAdvice(cards)
      .map(advice => `**${advice.name}:** ${advice.description}`)
      .join('\n')
  } catch (error) {}
}
