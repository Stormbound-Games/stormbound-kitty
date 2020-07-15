import Discord from 'discord.js'

const getEmbed = () => {
  const embed = new Discord.MessageEmbed()

  embed
    .setColor('#D7598B')
    .setAuthor(
      'Stormbound Kitty',
      'https://stormbound-kitty.com/assets/images/kitty.png',
      'https://stormbound-kitty.com'
    )

  return embed
}

export default getEmbed
