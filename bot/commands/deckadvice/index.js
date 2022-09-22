import { SlashCommandBuilder } from 'discord.js'
import getDeckAdvice from '#helpers/getDeckAdvice'
import getEmbed from '#helpers/getEmbed'
import getResolvedCardData from '#helpers/getResolvedCardData'
import serialization from '#helpers/serialization'
import getDeckIDFromURL from '#helpers/getDeckIDFromURL'
import indexArray from '#helpers/indexArray'

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
    const input = interaction.options.getString('deck')
    const id = getDeckIDFromURL(input)

    if (!id) {
      return interaction.reply({
        content: 'There was an error evaluating the given deck ID.',
        ephemeral: true,
      })
    }

    const cards = [...client.cards.values()]
    const cardsIndex = indexArray(cards)
    const cardsIndexBySid = indexArray(cards, 'sid')
    const embed = getEmbed()
      .setTitle(`💎  Deck Advice: ${id}`)
      .setURL(`https://stormbound-kitty.com/deck/${id}/detail`)

    try {
      const cards = serialization.deck
        .deserialize(cardsIndexBySid, id)
        .map(card => getResolvedCardData(cardsIndex, card))

      if (cards.some(card => !card)) {
        return interaction.reply({
          content: 'There was an error evaluating some of the cards.',
          ephemeral: true,
        })
      }

      const advice = await getDeckAdvice(cardsIndex, cards)

      if (advice.length === 0) {
        return interaction.editReply({
          content:
            'No particular suggestions could be found for that deck. It likely means this is a solid and well balanced deck, so kudos and enjoy playing it!',
          ephemeral: true,
        })
      }

      embed.addFields(
        ...advice.map(advice => ({
          name: advice.name,
          value: advice.description,
        }))
      )

      return interaction.reply({ embeds: [embed], ephemeral: true })
    } catch (error) {
      return interaction.reply({
        content: 'There was an error evaluating the given deck.',
        ephemeral: true,
      })
    }
  },
}

export default deckadvice
