import Discord from 'discord.js'

const getEmbed = ({ withHeader = true } = {}) => {
  const embed = new Discord.MessageEmbed()

  embed.setColor('#D7598B')

  if (withHeader) {
    embed.setAuthor(
      'Stormbound-Kitty',
      'https://cdn.sanity.io/images/5hlpazgd/production/8fb3c0530531a501d9eb31690b684b40d5761c8a-500x364.png',
      'https://stormbound-kitty.com'
    )
  }

  return embed
}

export default getEmbed
