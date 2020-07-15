import Discord from 'discord.js'
import GUIDES from '../../../data/guides.json'

export default {
  command: 'guides',
  help: function () {
    const embed = new Discord.MessageEmbed()

    embed
      .setTitle(`🧭  Guides help`)
      .setURL('https://stormbound-kitty.com/guides')
      .setDescription('List all existing guides from Stormbound-Kitty.')

    return embed
  },
  handler: function (message) {
    const embed = new Discord.MessageEmbed()

    embed
      .setColor('#D7598B')
      .setTitle('Guides')
      .setURL('https://stormbound-kitty.com/guides')
      .addFields(
        ...GUIDES.slice(0)
          .sort((a, b) => (a.name > b.name ? +1 : -1))
          .map(guide => ({
            name: guide.name,
            value: `<https://stormbound-kitty.com/guides/${guide.slug}>`,
            inline: true,
          }))
      )

    return embed
  },
}
