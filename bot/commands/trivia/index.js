import { SlashCommandBuilder } from 'discord.js'
import Trivia from './Trivia.js'
import getEmbed from '#helpers/getEmbed'
import trackBotCommand from '#helpers/trackBotCommand'

const cache = new Map()

const trivia = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription(
      'Initiate a card, question, or image trivia (only in #trivia).'
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('card')
        .setDescription('Start a card guessing trivia.')
        .addIntegerOption(option =>
          option.setName('duration').setDescription('Duration of the round.')
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('image')
        .setDescription('Start an image guessing trivia.')
        .addStringOption(option =>
          option
            .setName('difficulty')
            .setDescription('Difficulty of the round.')
            .addChoices(
              { name: 'Regular', value: 'regular' },
              { name: 'Hard', value: 'hard' }
            )
        )
        .addIntegerOption(option =>
          option.setName('duration').setDescription('Duration of the round.')
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('question')
        .setDescription('Start a question trivia.')
        .addIntegerOption(option =>
          option.setName('duration').setDescription('Duration of the round.')
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('score').setDescription('Retrieve your trivia score.')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('scores').setDescription('Retrieve all trivia scores.')
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const channel = client.channels.cache.get(interaction.channelId)

    if (channel.name !== 'trivia') {
      const embed = getEmbed()
        .setTitle('🔮 Trivia')
        .setDescription('The trivia command only works in the #trivia channel.')
        .setURL('https://stormbound-kitty.com/trivia')

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    const guildId = interaction.guildId
    const abbreviations = Object.fromEntries(client.abbreviations)
    const books = [...client.books.values()]
    const brawls = [...client.brawls.values()]
    const cards = [...client.cards.values()]

    if (!cache.has(guildId)) {
      cache.set(
        guildId,
        new Trivia({ books, cards, abbreviations, brawls, guildId })
      )
    }

    const trivia = cache.get(guildId)
    const subcommand = interaction.options.getSubcommand()

    trackBotCommand(interaction, { subcommand })

    if (['card', 'image', 'question'].includes(subcommand)) {
      return trivia.start(interaction)
    } else if (subcommand === 'scores') {
      return trivia.scores(interaction)
    } else if (subcommand === 'score') {
      return trivia.score(interaction)
    }
  },
}

export default trivia
