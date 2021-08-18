import DECKS from '~/data/decks'
import arrayRandom from '~/helpers/arrayRandom'
import capitalise from '~/helpers/capitalise'
import getEmbed from '~/helpers/getEmbed'
import getFactionFromDeckID from '~/helpers/getFactionFromDeckID'
import serialisation from '~/helpers/serialisation'
import { TAGS } from '~/constants/deck'
import { parseMessage } from '../decks'

export default {
  command: 'suggestdeck',
  label: '✅  Deck Suggestion',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/decks')
      .setDescription(
        `Suggest a deck matching the given search criteria. It optionally accepts a faction, tags and card to include (regardless of order and casing). For instance, \`!${this.command} ic\`, \`!${this.command} wp hl\` or \`!${this.command} brawl kg\`.`
      )
  },
  handler: function (message) {
    const { params, ignored } = parseMessage(message.toLowerCase())
    const embed = getEmbed().setTitle(`${this.label}`)

    if (Object.keys(params).length === 0) {
      const deck = arrayRandom(
        // If the tags are not provided, assume the expectation is to have a
        // deck that works and is competitive under normal circumstances (so
        // ranking and Diamond) and therefore discard any Brawl/Equals deck.
        DECKS.filter(
          deck => !deck.tags.includes('BRAWL') && !deck.tags.includes('EQUALS')
        )
      )

      embed.setTitle(deck.name)
      embed.setURL('https://stormbound-kitty.com/deck/' + deck.id)
      embed.addFields(
        { name: 'Author', value: deck.author, inline: true },
        {
          name: 'Faction',
          value: capitalise(getFactionFromDeckID(deck.id)),
          inline: true,
        },
        {
          name: 'Tags',
          value: deck.tags.map(tag => TAGS[tag] || tag).join(', ') || 'No tags',
          inline: true,
        }
      )

      return embed
    }

    const results = DECKS.filter(deck => {
      if (params.faction && getFactionFromDeckID(deck.id) !== params.faction) {
        return false
      }

      if (params.tags) {
        if (!params.tags.every(tag => deck.tags.includes(tag))) return false
      } else {
        // If the tags are not provided, assume the expectation is to have a
        // deck that works and is competitive under normal circumstances (so
        // ranking and Diamond) and therefore discard any Brawl/Equals deck.
        if (deck.tags.includes('BRAWL') || deck.tags.includes('EQUALS'))
          return false
      }

      if (
        params.including &&
        !serialisation.deck
          .deserialise(deck.id)
          .map(card => card.id)
          .includes(params.including)
      ) {
        return false
      }

      return true
    })

    if (results.length > 0) {
      const deck = arrayRandom(results)

      embed.setTitle(deck.name)
      embed.setURL('https://stormbound-kitty.com/deck/' + deck.id)
      embed.addFields(
        { name: 'Author', value: deck.author, inline: true },
        {
          name: 'Faction',
          value: capitalise(getFactionFromDeckID(deck.id)),
          inline: true,
        },
        {
          name: 'Tags',
          value: deck.tags.map(tag => TAGS[tag] || tag).join(', ') || 'No tags',
          inline: true,
        }
      )

      if (ignored.length > 0) {
        embed.addFields({
          name: 'Ignored terms',
          value: ignored.join(', '),
        })
      }

      return embed
    }
  },
}
