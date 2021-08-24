import getEmbed from '~/helpers/getEmbed'
import arrayRandom from '~/helpers/arrayRandom'
import ARTWORKS from '~/data/artworks'

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
  handler: function (message) {
    const embed = getEmbed()
    const { image, author, date } = arrayRandom(ARTWORKS)

    embed
      .setTitle(`${this.label}`)
      .setURL('https://stormbound-kitty.com/members/' + author)
      .addFields([
        { name: 'author', value: author, inline: true },
        { name: 'date', value: date, inline: true },
      ])
      .setImage('https://stormbound-kitty.com/assets/images/art/' + image)

    return embed
  },
}

export default fanart
