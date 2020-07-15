import Discord from 'discord.js'
import searchCards from '../../../helpers/searchCards'

export default {
  command: 'cardinfo',
  help: function () {
    const embed = new Discord.MessageEmbed()

    embed
      .setColor('#D7598B')
      .setTitle(`⚡️  Card Info help`)
      .setURL('https://stormbound-kitty.com/card')
      .setDescription(
        `Get information about the card(s) matching the given search criteria (up to 3 results). It expects a card abbreviation, a Stormbound-Kitty ID, or otherwise performs a “fuzzy search” on the card name. For instance, \`!${this.command} rof\`, \`!${this.command} N1\` or \`!${this.command} souls\`.`
      )

    return embed
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
