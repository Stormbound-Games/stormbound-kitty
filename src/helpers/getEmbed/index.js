import Discord from 'discord.js'

const getEmbed = ({ withHeader = true } = {}) => {
  const embed = new Discord.MessageEmbed()

  embed.setColor('#D7598B')

  if (withHeader) {
    embed.setAuthor(
      'Stormbound Kitty',
      'https://stormbound-kitty.com/assets/images/kitty.png',
      'https://stormbound-kitty.com'
    )
  }

  return embed
}

export default getEmbed
