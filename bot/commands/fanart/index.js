import { SlashCommandBuilder } from 'discord.js'
import getEmbed from '#helpers/getEmbed'
import arrayRandom from '#helpers/arrayRandom'
import getArtworks from '#api/artworks/getArtworks'

const fanart = {
  data: new SlashCommandBuilder()
    .setName('fanart')
    .setDescription('Get a random fan-art from the Stormbound community.'),

  async execute(interaction) {
    const artworks = await getArtworks()
    const embed = getEmbed()
    const { image, user, date } = arrayRandom(artworks)

    embed
      .setTitle('👩‍🎨  Fan-art')
      .setURL('https://stormbound-kitty.com/members/' + user.slug)
      .addFields([
        { name: 'author', value: user.name, inline: true },
        { name: 'date', value: date, inline: true },
      ])
      .setImage(image)

    return interaction.reply({ embeds: [embed], ephemeral: true })
  },
}

export default fanart
