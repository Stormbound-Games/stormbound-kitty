import getDeckAdvice from '~/helpers/getDeckAdvice'
import getEmbed from '~/helpers/getEmbed'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import getDeckIDFromURL from '~/helpers/getDeckIDFromURL'
import indexArray from '~/helpers/indexArray'
import getCards from '~/api/cards/getCards'

const deckadvice = {
  command: 'deckadvice',
  label: '💎  Deck Advice',
  aliases: [],
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/deck')
      .setDescription(
        `Get advice and suggestions for the given deck. It expects a fully qualified Stormbound-Kitty deck URL, or a Stormbound-Kitty deck ID. For instance, \`!${this.command} 3xn1n2s1n3s24s2n67s6n15s8n63s11\`. To get the deck URL/ID, either compose it on the site, or use the \`!deckid\` command.`
      )
  },
  handler: async function (message) {
    const id = getDeckIDFromURL(message)

    if (id.length === 0) return

    const cards = await getCards()
    const cardsIndex = indexArray(cards)
    const cardsIndexBySid = indexArray(cards, 'sid')
    const embed = getEmbed()
      .setTitle(`${this.label}: ` + id)
      .setURL(`https://stormbound-kitty.com/deck/${id}/detail`)

    try {
      const cards = serialization.deck
        .deserialize(cardsIndexBySid, id)
        .map(card => getResolvedCardData(cardsIndex, card))

      if (cards.some(card => !card)) return

      const advice = await getDeckAdvice(cardsIndex, cards)

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

export default deckadvice
