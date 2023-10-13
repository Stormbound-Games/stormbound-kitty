import { SlashCommandBuilder } from 'discord.js'
import getDrawingExpectations from '#helpers/getDrawingExpectations'
import getDrawingProbability from '#helpers/getDrawingProbability'
import getEmbed from '#helpers/getEmbed'

const TARGETS = {
  FUSION_STONES: 'Fusion Stones',
  ANY_COMMON: 'any Common',
  ANY_RARE: 'any Rare',
  ANY_EPIC: 'any Epic',
  ANY_LEGENDARY: 'any Legendary',
  SPECIFIC_COMMON: 'a specific Common',
  SPECIFIC_RARE: 'a specific Rare',
  SPECIFIC_EPIC: 'a specific Epic',
  SPECIFIC_LEGENDARY: 'a specific Legendary',
}

const bookodds = {
  data: new SlashCommandBuilder()
    .setName('bookodds')
    .setDescription(
      'Get the odds of drawing a certain card or Fusion stones from a certain book.',
    )
    .addStringOption(option =>
      option
        .setName('book_type')
        .setDescription('The type of book.')
        .setRequired(true)
        .setAutocomplete(true),
    )
    .addStringOption(option =>
      option
        .setName('target')
        .setDescription('What you hope to find.')
        .addChoices(
          ...Object.entries(TARGETS).map(([value, name]) => ({ name, value })),
        ),
    ),

  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused()
    const books = [...client.books.values()]
    const filtered = books.filter(book =>
      book.name.match(new RegExp(focusedValue, 'gi')),
    )

    return interaction.respond(
      filtered.map(book => ({ name: book.name, value: book.id })),
    )
  },

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const bookId = interaction.options.getString('book_type')
    const target = interaction.options.getString('target')
    const cards = [...client.cards.values()]
    const book = client.books.get(bookId)
    const embed = getEmbed()
      .setTitle('📕 Book Drawing Odds')
      .setURL('https://stormbound-kitty.com/calculators/books')

    if (!book) {
      embed.setDescription(`Could not find a book matching “${bookId}”.`)

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    embed.setImage(book.image)

    if (target === 'FUSION_STONES') {
      const odds = book.fsOdds * 100

      embed.setDescription(
        `A **${book.name}** has ${odds}% chance of drawing **Fusion Stones**.`,
      )

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    if (target) {
      const drawing = getDrawingExpectations(target)
      const expectations = drawing.getExpectations(cards, book.only)
      const probability = getDrawingProbability(cards, book, expectations)
      const odds = (probability * 100).toFixed(2)

      embed.setDescription(
        `A **${book.name}** has ${odds}% chance of drawing **${TARGETS[target]}**.`,
      )

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    const odds = Object.keys(TARGETS).map(target => {
      const drawing = getDrawingExpectations(target)
      const expectations = drawing.getExpectations(cards, book.only)
      const probability = getDrawingProbability(cards, book, expectations)
      const odds = (probability * 100).toFixed(2)

      return { target, odds }
    })
    const anyOdds = odds
      .filter(({ target }) => target.startsWith('ANY_'))
      .map(({ odds }) => odds)
      .join('/')
    const specificOdds = odds
      .filter(({ target }) => target.startsWith('SPECIFIC_'))
      .map(({ odds }) => odds)
      .join('/')
    const fsOdds = book.fsOdds * 100

    embed.setDescription(
      `A **${book.name}** has a static ${fsOdds}% chance of drawing **Fusion Stones**, an estimated ${specificOdds}% chance of drawing **a specific card** and an estimated ${anyOdds}% chance of drawing **any card**.`,
    )

    return interaction.reply({ embeds: [embed], ephemeral })
  },
}

export default bookodds
