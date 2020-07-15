import Discord from 'discord.js'

const BASE_MESSAGE =
  'This Discord bot and <https://stormbound-kitty.com> are solely maintained by <@368097495605182483> and 100% free — no ads, no tracking, no paywall. If you enjoy them, please consider donating: <https://stormbound-kitty.com/donate>'

const getEmbed = () => {
  const embed = new Discord.MessageEmbed()

  embed
    .setColor('#D7598B')
    .setTitle(`💸  Donate help`)
    .setURL('https://stormbound-kitty.com/donate')
    .setDescription(BASE_MESSAGE)

  return embed
}

export default {
  command: 'donate',
  help: function () {
    return getEmbed()
  },
  handler: function () {
    const embed = getEmbed()

    embed.setTitle('💸  Donate')

    return embed
  },
}
