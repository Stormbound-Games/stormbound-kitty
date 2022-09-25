import Discord from 'discord.js'

const getEmbed = ({ withHeader = true } = {}) => {
  const embed = new Discord.EmbedBuilder()

  embed.setColor('#101F26')

  if (withHeader) {
    embed.setAuthor({ name: 'Stormbound-Kitty' })
  }

  return embed
}

export default getEmbed
