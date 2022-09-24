import { SlashCommandBuilder } from 'discord.js'
import { FACTIONS } from '#constants/game'
import areAllValuesEqual from '#helpers/arrayRandom'
import arrayRandom from '#helpers/arrayRandom'
import searchCards from '#helpers/searchCards'
import getRandomDeck from '#helpers/getRandomDeck'
import serialization from '#helpers/serialization'
import getEmbed from '#helpers/getEmbed'

const ALLOWED_FACTIONS = FACTIONS.filter(faction => faction !== 'neutral')

const validateFaction = (faction, including = []) => {
  const randomFaction = arrayRandom(ALLOWED_FACTIONS)

  // If the provided faction is “neutral”, abort as a random deck cannot be
  // neutral.
  if (faction === 'neutral') return null

  // If there are no included cards, return the provided faction, if any, or a
  // random one.
  if (including.length === 0) return faction || randomFaction

  const factions = including
    .filter(card => card.faction !== 'neutral')
    .map(card => card.faction)

  // If the provided cards are from different factions (but not neutral), abort
  // as a random deck cannot be multi-faction.
  if (!areAllValuesEqual(factions)) {
    return null
  }

  // If some of the included cards are neither neutral, nor from the provided
  // faction, abort as there is a conflict between the provided faction and the
  // provided cards.
  if (faction && factions.some(card => card.faction !== faction)) {
    return null
  }

  // Otherwise return the provided faction if any, or the faction of an included
  // card if any and not neutral, or a random faction.
  return faction || factions[0] || randomFaction
}

export const parseIncluded = (allCards, abbreviations, message) => {
  const parts = message.split(/\s*,\s*/g).filter(Boolean)
  const cards = []

  parts.forEach(part => {
    // Make sure not to include a card twice. For instance, `herald, herald`
    // should include Pan Heralds and Herald’s Hymn, but not one of them twice.
    // Same goes for other cases, such as `dread, dread`.
    const card = searchCards(allCards, abbreviations, part).find(
      card => !cards.map(c => c.id).includes(card.id)
    )
    if (card) cards.push(card)
  })

  return cards
}

const randomdeck = {
  data: new SlashCommandBuilder()
    .setName('randomdeck')
    .setDescription('Randomly generate a deck.')
    .addStringOption(option =>
      option
        .setName('faction')
        .setDescription('The deck faction.')
        .addChoices(
          { name: 'Ironclad', value: 'ironclad' },
          { name: 'Winter', value: 'winter' },
          { name: 'Swarm', value: 'swarm' },
          { name: 'Shadowfen', value: 'shadowfen' }
        )
    )
    .addStringOption(option =>
      option
        .setName('including')
        .setDescription('Cards that must be included (separated by commas).')
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const message = interaction.options.getString('including') || ''
    const cards = [...client.cards.values()]
    const abbreviations = Object.fromEntries(client.abbreviations)
    const including = parseIncluded(
      cards,
      abbreviations,
      message?.toLowerCase()
    )
    const faction = validateFaction(
      interaction.options.getString('faction'),
      including
    )

    if (!faction) {
      const embed = getEmbed()
        .setTitle('🎲 Random Deck')
        .setURL('https://stormbound-kitty.com/deck')
        .setDescription(
          'There was an issue generating a random deck. This might be because of conflicting argument (e.g. `winter` + `rof`, `fc, mia`…).'
        )

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    const initialCards = including.length ? including.slice(0, 3) : undefined
    const deck = getRandomDeck({ availableCards: cards, initialCards, faction })
    const id = serialization.deck.serialize(deck)

    return interaction.reply({
      content: 'https://stormbound-kitty.com/deck/' + id,
      ephemeral,
    })
  },
}

export default randomdeck
