import getEmbed from '~/helpers/getEmbed'
import searchCards from '~/helpers/searchCards'
import handleSearchAlias from '~/helpers/handleSearchAlias'
import getAbbreviations from '~/api/misc/getAbbreviations'
import getCards from '~/api/cards/getCards'

const cardinfo = {
  command: 'cardinfo',
  label: '⚡️  Card Info',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/card')
      .setDescription(
        `Get information about the card(s) matching the given search criteria (up to 3 results). It expects a card abbreviation, a Stormbound-Kitty ID, or otherwise performs a “fuzzy search” on the card name. For instance, \`!${this.command} rof\`, \`!${this.command} N1\` or \`!${this.command} souls\`.`
      )
  },
  handler: async function (message) {
    const alias = handleSearchAlias(message)

    if (alias[0] === 'id') {
      return `https://stormbound-kitty.com/cards/${alias[1]}`
    }

    const cards = await getCards()
    const abbreviations = await getAbbreviations({ casing: 'LOWERCASE', cards })

    return (
      searchCards(cards, abbreviations, message)
        .map(card => `https://stormbound-kitty.com/cards/${card.id}`)
        .slice(0, 3)
        .join('\n') || undefined
    )
  },
}

export default cardinfo
