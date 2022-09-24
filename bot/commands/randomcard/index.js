import { SlashCommandBuilder } from 'discord.js'
import { FACTIONS, UNIT_TYPES, RARITIES, TYPES } from '#constants/game'
import arrayRandom from '#helpers/arrayRandom'
import capitalize from '#helpers/capitalize'
import getEmbed from '#helpers/getEmbed'

const linkify = card => `https://stormbound-kitty.com/cards/${card.id}`

const randomcard = {
  data: new SlashCommandBuilder()
    .setName('randomcard')
    .setDescription('Get a random card.')
    .addStringOption(option =>
      option
        .setName('faction')
        .setDescription('The card faction.')
        .addChoices(
          ...FACTIONS.map(faction => ({
            name: capitalize(faction),
            value: faction,
          }))
        )
    )
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('The card type.')
        .addChoices(
          ...TYPES.map(faction => ({
            name: capitalize(faction),
            value: faction,
          }))
        )
    )
    .addStringOption(option =>
      option
        .setName('rarity')
        .setDescription('The card rarity.')
        .addChoices(
          ...RARITIES.map(faction => ({
            name: capitalize(faction),
            value: faction,
          }))
        )
    )
    .addStringOption(option =>
      option
        .setName('unit_type')
        .setDescription('The card unit type.')
        .addChoices(
          ...UNIT_TYPES.map(faction => ({
            name: capitalize(faction),
            value: faction,
          }))
        )
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const faction = interaction.options.getString('faction')
    const type = interaction.options.getString('type')
    const rarity = interaction.options.getString('rarity')
    const unitType = interaction.options.getString('unit_type')
    const cards = [...client.cards.values()].filter(card => !card.token)

    if (!faction && !type && !rarity && !unitType) {
      return interaction.reply({
        content: linkify(arrayRandom(cards)),
        ephemeral,
      })
    }

    const results = cards.filter(card => {
      if (card.token) return false
      if (faction && card.faction !== faction) return false
      if (type && card.type !== type) return false
      if (rarity && card.rarity !== rarity) return false
      if (unitType && !card.unitTypes.includes(unitType)) return false
      return true
    })

    if (results.length === 0) {
      const filters = [faction, type, rarity, unitType].filter(Boolean)
      const embed = getEmbed()
        .setTitle('🃏 Random Card')
        .setDescription(`Could not find a card matching ${filters.join(', ')}.`)
        .setURL('https://stormbound-kitty.com/card')

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    return interaction.reply({
      content: linkify(arrayRandom(results)),
      ephemeral,
    })
  },
}

export default randomcard
