import { SlashCommandBuilder } from 'discord.js'
import getDeckAdvice from '#helpers/getDeckAdvice'
import getEmbed from '#helpers/getEmbed'
import getResolvedCardData from '#helpers/getResolvedCardData'
import serialization from '#helpers/serialization'
import getDeckIDFromURL from '#helpers/getDeckIDFromURL'
import indexArray from '#helpers/indexArray'
import trackBotCommand from '#helpers/trackBotCommand'

const deckadvice = {
  data: new SlashCommandBuilder()
    .setName('deckadvice')
    .setDescription('Get advice and suggestions for the given deck.')
    .addStringOption(option =>
      option
        .setName('deck')
        .setDescription('A Stormbound-Kitty deck ID or deck URL.')
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const input = interaction.options.getString('deck')
    const id = getDeckIDFromURL(input)
    const embed = getEmbed().setTitle('💎 Deck Advice')

    trackBotCommand(interaction, { deck: id })

    if (!id) {
      embed.setDescription('There was an error evaluating the given deck ID.')

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    const cards = [...client.cards.values()]
    const cardsIndex = indexArray(cards)
    const cardsIndexBySid = indexArray(cards, 'sid')

    embed.setURL(`https://stormbound-kitty.com/deck/${id}/detail`)

    try {
      const cards = serialization.deck
        .deserialize(cardsIndexBySid, id)
        .map(card => getResolvedCardData(cardsIndex, card))

      if (cards.some(card => !card)) {
        embed.setDescription('There was an error evaluating some of the cards.')

        return interaction.reply({ embeds: [embed], ephemeral })
      }

      const advice = await getDeckAdvice(cardsIndex, cards)

      if (advice.length === 0) {
        embed.setDescription(
          'No particular suggestions could be found for that deck. It likely means this is a solid and well balanced deck, so kudos and enjoy playing it!'
        )

        return interaction.reply({ embeds: [embed], ephemeral })
      }

      embed.addFields(
        ...advice.map(advice => ({
          name: advice.name,
          value: advice.description,
        }))
      )

      return interaction.reply({ embeds: [embed], ephemeral })
    } catch (error) {
      embed.setDescription('There was an error evaluating the given deck.')

      return interaction.reply({ embeds: [embed], ephemeral })
    }
  },
}

export default deckadvice
