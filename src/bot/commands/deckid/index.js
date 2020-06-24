import serialisation from '../../../helpers/serialisation'
import searchCards from '../../../helpers/searchCards'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'
import clamp from '../../../helpers/clamp'

const getLevelOut = term => {
  term = term.trim()
  const leadingLevel = (term.match(/^(\d)/) || [])[1]
  const trailingLevel = (term.match(/(\d)$/) || [])[1]
  const hasLevel = leadingLevel || trailingLevel
  const level = clamp(+hasLevel, 1, 5)

  term = term.replace(/^(\d)/, '').replace(/(\d)$/, '')

  return [hasLevel ? level : null, term]
}

export default {
  command: 'deckid',
  help: function () {
    return `⚙️  **Deck ID:** Get the URL/ID of a deck based on the listed cards (and optional levels). An optional global deck level can be specified at the beginning or the end of the command, and optional individual card levels can be specified alongside each card in the list. For instance, \`!${this.command} 4 gp,sm,…,dopp\` or \`!${this.command} gp 3,sm 2,…,1 dopp\`.`
  },
  handler: function (message) {
    if (message.length === 0) return

    const [deckLevel, search] = getLevelOut(message)
    const unknown = []
    const cards = []

    search.split(/\s*,\s*/g).forEach(term => {
      const [level, search] = getLevelOut(term)
      const [card] = searchCards(search)
      if (!card) return unknown.push(term)
      if (cards.find(c => c.id === card.id)) return
      cards.push({ id: card.id, level: level || deckLevel || 1 })
    })

    if (cards.length === 0) return

    return [
      'https://stormbound-kitty.com/deck/' +
        serialisation.deck.serialise(cards.slice(0, 12)),
      getIgnoredSearch(message, unknown, 'COMMA'),
    ]
      .filter(Boolean)
      .join('\n')
  },
}
