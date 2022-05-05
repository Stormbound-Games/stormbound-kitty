import arrayRandom from '~/helpers/arrayRandom'
import getEmbed from '~/helpers/getEmbed'
import getCards from '~/api/cards/getCards'

const getChunks = cards => {
  const starts = []
  const ends = []
  const names = []

  cards.forEach(card => {
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
}

const getRandomCardName = cards => {
  const [STARTS, ENDS, NAMES] = getChunks(cards)
  const start = arrayRandom(STARTS)
  const end = arrayRandom(ENDS)
  const name = start + ' ' + end

  return NAMES.includes(name) ? getRandomCardName(cards) : name
}

const mashup = {
  command: 'mashup',
  label: '🤪  Card Mashup',
  aliases: [],
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com')
      .setDescription(
        'Randomly generate a random card name from existing ones.'
      )
  },
  handler: async function () {
    const cards = await getCards()
    return getEmbed().setTitle(this.label + ': ' + getRandomCardName(cards))
  },
}

export default mashup
