import { TRIVIA_CHANNEL } from '../../../constants/bot'
import getDeckAdvice from '../../../helpers/getDeckAdvice'
import getResolvedCardData from '../../../helpers/getResolvedCardData'
import serialisation from '../../../helpers/serialisation'

const getIdFromURL = url =>
  url
    .replace('https://stormbound-kitty.com/deck/', '')
    .replace('/detail', '')
    .replace('/dry-run', '')
    .replace('/tracker', '')

export default {
  command: 'deckadvice',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  help: function () {
    return `💎  **Deck Advice:** Get advice and suggestions for the given deck. It expects a fully qualified Stormbound-Kitty deck URL, or a Stormbound-Kitty deck ID. For instance, \`!${this.command} 3n13n23s13n33s243s23n633n673s63n153s83s11\`. To get the deck URL/ID, either compose it on the site, or use the \`!deckid\` command.`
  },
  handler: async function (message) {
    const id = getIdFromURL(message)

    if (id.length === 0) return

    try {
      const cards = serialisation.deck.deserialise(id).map(getResolvedCardData)
      const advice = await Promise.all(
        getDeckAdvice(cards).map(advice => Promise.resolve(advice))
      )

      if (advice.length === 0) {
        return 'No particular suggestions could be found for that deck. It likely means this is a solid and well balanced deck, so kudos and enjoy playing it!'
      }

      return (
        'Some comments and possible suggestions about your deck:\n' +
        advice
          .map(advice => `- **${advice.name}:** ${advice.description}`)
          .join('\n')
      )
    } catch (error) {}
  },
}
