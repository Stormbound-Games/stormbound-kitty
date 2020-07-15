import serialisation from '../../../helpers/serialisation'
import searchCards from '../../../helpers/searchCards'
import getEmbed from '../../../helpers/getEmbed'
import getRawCardData from '../../../helpers/getRawCardData'
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
    return getEmbed()
      .setTitle(`⚙️  Deck ID: help`)
      .setURL('https://stormbound-kitty.com/deck')
      .setDescription(
        `Get the URL/ID of a deck based on the listed cards (and optional levels). An optional global deck level can be specified at the beginning or the end of the command, and optional individual card levels can be specified alongside each card in the list. For instance, \`!${this.command} 4 gp,sm,…,dopp\` or \`!${this.command} gp 3,sm 2,…,1 dopp\`.`
      )
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

    const id = serialisation.deck.serialise(cards.filter(Boolean).slice(0, 12))
    const embed = getEmbed()
      .setTitle(`⚙️  Deck ID`)
      .setURL('https://stormbound-kitty.com/deck/' + id)
      .setDescription(`This deck’s ID is ${id}.`)

    embed.addFields(
      ...cards
        .filter(Boolean)
        .slice(0, 12)
        .map(card => ({
          name: getRawCardData(card.id).name,
          value: 'Level ' + card.level,
          inline: true,
        }))
    )

    if (unknown.filter(Boolean).length > 0) {
      embed.addFields({
        name: 'Ignored terms',
        value: unknown.filter(Boolean).join(', '),
      })
    }

    return embed
  },
}
