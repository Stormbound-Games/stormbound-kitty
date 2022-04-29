import serialization from '~/helpers/serialization'
import searchCards from '~/helpers/searchCards'
import getEmbed from '~/helpers/getEmbed'
import clamp from '~/helpers/clamp'
import getAbbreviations from '~/api/misc/getAbbreviations'
import getCards from '~/api/cards/getCards'

const getLevelOut = term => {
  term = term.trim()
  const leadingLevel = (term.match(/^(\d)/) || [])[1]
  const trailingLevel = (term.match(/(\d)$/) || [])[1]
  const hasLevel = leadingLevel || trailingLevel
  const level = clamp(+hasLevel, 1, 5)

  term = term.replace(/^(\d)/, '').replace(/(\d)$/, '')

  return [hasLevel ? level : null, term]
}

const deckid = {
  command: 'deckid',
  label: '⚙️  Deck ID',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/deck')
      .setDescription(
        `Get the URL/ID of a deck based on the listed cards (and optional levels). An optional global deck level can be specified at the beginning or the end of the command, and optional individual card levels can be specified alongside each card in the list. For instance, \`!${this.command} 4 gp,sm,…,dopp\` or \`!${this.command} gp 3,sm 2,…,1 dopp\`.`
      )
  },
  handler: async function (message) {
    if (message.length === 0) return

    const allCards = await getCards()
    const abbreviations = await getAbbreviations({
      casing: 'LOWERCASE',
      cards: allCards,
    })
    const [deckLevel, search] = getLevelOut(message)
    const unknown = []
    const cards = []

    search.split(/\s*,\s*/g).forEach(term => {
      const [level, search] = getLevelOut(term)
      const [card] = searchCards(allCards, abbreviations, search)
      if (!card) return unknown.push(term)
      if (cards.find(c => c.id === card.id)) return
      cards.push({ id: card.id, level: level || deckLevel || 1 })
    })

    if (cards.length === 0) return

    const id = serialization.deck.serialize(cards.filter(Boolean).slice(0, 12))
    const embed = getEmbed()
      .setTitle(`${this.label}`)
      .setURL('https://stormbound-kitty.com/deck/' + id)
      .setDescription(`This deck’s ID is ${id}.`)

    embed.addFields(
      ...cards
        .filter(Boolean)
        .slice(0, 12)
        .map(card => ({
          name: allCards.find(c => c.id === card.id).name,
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

export default deckid
