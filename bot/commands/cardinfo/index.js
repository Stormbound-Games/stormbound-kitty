import { SlashCommandBuilder } from 'discord.js'
import searchCards from '#helpers/searchCards'
import getEmbed from '#helpers/getEmbed'
import trackBotCommand from '#helpers/trackBotCommand'

const cardinfo = {
  data: new SlashCommandBuilder()
    .setName('cardinfo')
    .setDescription(
      'Get information about the card(s) matching the given search criteria (up to 3 results).'
    )
    .addStringOption(option =>
      option
        .setName('card')
        .setDescription('An abbreviation, ID, or approximate name.')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused()
    const cards = [...client.cards.values()]
    const abbreviations = Object.fromEntries(client.abbreviations)
    const filtered = searchCards(cards, abbreviations, focusedValue)

    return interaction.respond(
      filtered.map(card => ({ name: card.name, value: card.id }))
    )
  },

  // @TODO: add support back for aliases
  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const id = interaction.options.getString('card')
    const card = client.cards.get(id)

    trackBotCommand(interaction, { card: id })

    if (!card) {
      const embed = getEmbed()
        .setTitle('⚡️ Card Info')
        .setURL('https://stormbound-kitty.com/card')
        .setDescription(`Could not find a card matching “${id}”.`)

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    return interaction.reply({
      content: `https://stormbound-kitty.com/cards/${id}`,
      ephemeral,
    })
  },
}

export default cardinfo
