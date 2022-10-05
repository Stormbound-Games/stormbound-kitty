import { SlashCommandBuilder } from 'discord.js'
import getCardValue from '#helpers/getCardValue'
import searchCards from '#helpers/searchCards'
import getEmbed from '#helpers/getEmbed'
import trackBotCommand from '#helpers/trackBotCommand'

const cardvalue = {
  data: new SlashCommandBuilder()
    .setName('cardvalue')
    .setDescription('Get the estimated value of a card for a single turn.')
    .addStringOption(option =>
      option
        .setName('card')
        .setDescription('An abbreviation, ID, or approximate name.')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('level')
        .setDescription('Card level')
        .addChoices(
          { name: '1', value: 1 },
          { name: '2', value: 2 },
          { name: '3', value: 3 },
          { name: '4', value: 4 },
          { name: '5', value: 5 }
        )
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const input = interaction.options.getString('card')
    const cards = [...client.cards.values()]
    const abbreviations = Object.fromEntries(client.abbreviations)
    const [card] = searchCards(cards, abbreviations, input)
    const embed = getEmbed()
      .setTitle('⚖️ Card Value')
      .setURL('https://stormbound-kitty.com/calculators/value')

    trackBotCommand(interaction, { card: input })

    if (!card) {
      embed.setDescription(`Could not find a card matching “${input}”.`)

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    embed.setImage(card.image)

    const level = interaction.options.getInteger('level') || 1
    const cardsIndex = Object.fromEntries(client.cards)
    const value = getCardValue(cardsIndex, card.id, level)

    if (!value) {
      embed.setDescription(
        `It is not possible to efficiently compute the value of ${card.name}.`
      )

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    const min = value[0].toFixed(2)
    const max = value[1].toFixed(2)
    const avg = ((value[0] + value[1]) / 2).toFixed(2)

    const content =
      min === max
        ? `The estimated value for ${card.name} at level ${level} for a single turn is ${avg}.`
        : `The estimated value for ${card.name} at level ${level} for a single turn is between ${min} and ${max}, averaging at ${avg}.`

    embed
      .setDescription(content)
      .setURL(
        `https://stormbound-kitty.com/calculators/value/${level}${card.id.toLowerCase()}`
      )
      .addFields([
        { name: 'Minimum', value: min, inline: true },
        { name: 'Maximum', value: max, inline: true },
        { name: 'Average', value: avg, inline: true },
      ])

    return interaction.reply({ embeds: [embed], ephemeral })
  },
}

export default cardvalue
