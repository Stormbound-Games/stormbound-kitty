import getDeckAdvice from '../../../helpers/getDeckAdvice'
import getEmbed from '../../../helpers/getEmbed'
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
  label: '💎  Deck Advice',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/deck')
      .setDescription(
        `Get advice and suggestions for the given deck. It expects a fully qualified Stormbound-Kitty deck URL, or a Stormbound-Kitty deck ID. For instance, \`!${this.command} 3n13n23s13n33s243s23n633n673s63n153s83s11\`. To get the deck URL/ID, either compose it on the site, or use the \`!deckid\` command.`
      )
  },
  handler: async function (message) {
    const id = getIdFromURL(message)

    if (id.length === 0) return

    const embed = getEmbed()
      .setTitle(`${this.label}: ` + id)
      .setURL('https://stormbound-kitty.com/deck/' + id)

    try {
      const cards = serialisation.deck.deserialise(id).map(getResolvedCardData)
      const promises = getDeckAdvice(cards)
      const advice = (await Promise.all(promises)).filter(Boolean)

      if (advice.length === 0) {
        embed.setDescription(
          'No particular suggestions could be found for that deck. It likely means this is a solid and well balanced deck, so kudos and enjoy playing it!'
        )

        return embed
      }

      embed.addFields(
        ...advice.map(advice => ({
          name: advice.name,
          value: advice.description,
        }))
      )

      return embed
    } catch (error) {}
  },
}
