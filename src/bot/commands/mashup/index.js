import Discord from 'discord.js'
import cards from '../../../data/cards'
import arrayRandom from '../../../helpers/arrayRandom'

const [STARTS, ENDS] = (() => {
  const starts = []
  const ends = []

  cards.forEach(card => {
    const [start, ...rest] = card.name.split(/\s+/g)
    if (card.token) return
    if (rest.length === 0) {
      ends.push(start)
    } else {
      starts.push(start.replace(/,/g, ''))
      ends.push(rest.join(' '))
    }
  })

  return [starts, ends]
})()

export default {
  command: 'mashup',
  help: function () {
    const embed = new Discord.MessageEmbed()

    embed
      .setColor('#D7598B')
      .setTitle('🤪  Mashup help')
      .setURL('https://stormbound-kitty.com')
      .setDescription(
        'Randomly generate a random card name from existing ones.'
      )

    return embed
  },
  handler: async function (message, client, messageObject) {
    const embed = new Discord.MessageEmbed()

    embed
      .setColor('#D7598B')
      .setTitle('🤪  Mashup')
      .setURL('https://stormbound-kitty.com')
      .setDescription(arrayRandom(STARTS) + ' ' + arrayRandom(ENDS))

    return embed
  },
}
