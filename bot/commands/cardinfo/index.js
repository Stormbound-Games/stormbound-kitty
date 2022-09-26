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
    ),

  // @TODO: add support back for aliases
  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const input = interaction.options.getString('card')
    const cards = [...client.cards.values()]
    const abbreviations = Object.fromEntries(client.abbreviations)
    const [card] = searchCards(cards, abbreviations, input)

    trackBotCommand(interaction, { card: input })

    if (!card) {
      const embed = getEmbed()
        .setTitle('⚡️ Card Info')
        .setURL('https://stormbound-kitty.com/card')
        .setDescription(`Could not find a card matching “${input}”.`)

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    return interaction.reply({
      content: `https://stormbound-kitty.com/cards/${card.id}`,
      ephemeral,
    })
  },
}

export default cardinfo
