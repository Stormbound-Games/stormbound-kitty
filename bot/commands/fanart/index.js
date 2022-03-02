import getEmbed from '~/helpers/getEmbed'
import arrayRandom from '~/helpers/arrayRandom'
import getArtworks from '~/api/artworks/getArtworks'

const fanart = {
  command: 'fanart',
  label: '👩‍🎨  Fan-art',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/fan-art')
      .setDescription(
        `Get a random fan-art from the community. For instance, \`!${this.command}\`.`
      )
  },
  handler: async function (message) {
    const artworks = await getArtworks()
    const embed = getEmbed()
    const { image, user, date } = arrayRandom(artworks)

    embed
      .setTitle(`${this.label}`)
      .setURL('https://stormbound-kitty.com/members/' + user.slug)
      .addFields([
        { name: 'author', value: user.name, inline: true },
        { name: 'date', value: date, inline: true },
      ])
      .setImage(image)

    return embed
  },
}

export default fanart
