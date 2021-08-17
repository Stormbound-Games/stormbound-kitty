import getEmbed from '~/helpers/getEmbed'
import searchCards from '~/helpers/searchCards'

export default {
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
  handler: function (message) {
    return (
      searchCards(message)
        .map(card => 'https://stormbound-kitty.com/card/' + card.id)
        .slice(0, 3)
        .join('\n') || undefined
    )
  },
}
