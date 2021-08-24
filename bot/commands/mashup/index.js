import CARDS from '~/data/cards'
import arrayRandom from '~/helpers/arrayRandom'
import getEmbed from '~/helpers/getEmbed'

const [STARTS, ENDS, NAMES] = (() => {
  const starts = []
  const ends = []
  const names = []

  CARDS.forEach(card => {
    names.push(card.name)
    const [start, ...rest] = card.name.split(/\s+/g)
    if (card.token) return
    if (rest.length === 0) {
      ends.push(start)
    } else {
      starts.push(start.replace(/,/g, ''))
      ends.push(rest.join(' '))
    }
  })

  return [starts, ends, names]
})()

const getRandomCardName = () => {
  const start = arrayRandom(STARTS)
  const end = arrayRandom(ENDS)
  const name = start + ' ' + end

  return NAMES.includes(name) ? getRandomCardName() : name
}

const mashup = {
  command: 'mashup',
  label: '🤪  Card Mashup',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com')
      .setDescription(
        'Randomly generate a random card name from existing ones.'
      )
  },
  handler: async function (message, client, messageObject) {
    return getEmbed().setTitle(this.label + ': ' + getRandomCardName())
  },
}

export default mashup
