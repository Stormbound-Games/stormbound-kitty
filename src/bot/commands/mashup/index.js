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
    return `🤪  **Random Name Generator:** Randomly generate a random card name from existing ones.`
  },
  handler: async function (message, client, messageObject) {
    return arrayRandom(STARTS) + ' ' + arrayRandom(ENDS)
  },
}
