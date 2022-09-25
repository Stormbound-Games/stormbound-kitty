import api from '#helpers/triviapi'
import arrayRandom from '#helpers/arrayRandom'
import capitalize from '#helpers/capitalize'
import formatTriviaScores, {
  groupScoresByPoints,
} from '#helpers/formatTriviaScores'
import getEmbed from '#helpers/getEmbed'
import getRandomQuestion from '#helpers/getRandomQuestion'
import getTriviaQuestions from '#helpers/getTriviaQuestions'
import parseCardGuess from '#helpers/parseCardGuess'
import searchCards from '#helpers/searchCards'
import getOrdinalSuffix from '#helpers/getOrdinalSuffix'
import clamp from '#helpers/clamp'
import Canvas from './Canvas.js'

const KITTY_ID = '368097495605182483'

export default class Trivia {
  constructor({
    guildId,
    books = [],
    cards = [],
    abbreviations = {},
    brawls = [],
    withScores = true,
  }) {
    this.withScores = withScores
    this.mode =
      this.difficulty =
      this.duration =
      this.answer =
      this.initiator =
      this.collector =
        null
    this.streaks = []
    this.cards = cards
    this.abbreviations = abbreviations
    this.guildId = guildId
    this.questions = getTriviaQuestions(cards, brawls, books)
    this.canvas = new Canvas()
  }

  start(interaction) {
    const channel = interaction.channel
    const mode = interaction.options.getSubcommand().toUpperCase()
    const duration = clamp(
      interaction.options.getInteger('duration') ||
        (mode === 'QUESTION' ? 15 : 75),
      mode === 'QUESTION' ? 8 : 30,
      mode === 'QUESTION' ? 20 : 120
    )

    if (this.mode || !mode) return

    this.mode = mode
    this.difficulty = interaction.options.getString('difficulty') || 'regular'
    this.duration = duration
    this.initiator = interaction.user
    this.answer = this.defineAnswer()
    this.collector = this.createCollector(channel)
    this.canvas.setDifficulty(this.difficulty)
    this.halfTimer = setTimeout(
      () => this.halfTime(channel),
      (this.duration / 2) * 1000
    )

    return this.announceTrivia(interaction)
  }

  halfTime(channel) {
    const embed = getEmbed({ withHeader: false })
      .setTitle('⏳ Half time!')
      .setDescription(`Only ${this.duration / 2} seconds left, hurry up!`)

    if (this.mode === 'IMAGE') {
      this.canvas
        .getAttachment(this.answer.image, 1.75)
        .then(attachment =>
          channel.send({ files: [attachment], embeds: [embed] })
        )
    } else {
      channel.send({ embeds: [embed] })
    }
  }

  createCollector(channel) {
    const collector = channel.createMessageCollector({
      filter: message => this.shouldCollect(message),
      time: this.duration * 1000,
    })

    collector.on('collect', message => {
      const output =
        message.content === 'stop'
          ? this.handleAbort(message)
          : this.guess(message)

      message.channel.send({ embeds: [output] })
    })

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        const embed = getEmbed({ withHeader: false }).setTitle('⌛️ Time’s up!')

        if (this.mode !== 'QUESTION') {
          embed.setDescription(`The answer was “**${this.answer.name}**”!`)
        }

        channel.send({ embeds: [embed] })
        this.stop('TIMEOUT')
      }
    })

    return collector
  }

  defineAnswer() {
    if (this.mode === 'IMAGE' || this.mode === 'CARD') {
      return arrayRandom(this.cards.filter(card => !card.token))
    } else if (this.mode === 'QUESTION') {
      const { question, choices } = getRandomQuestion(this.questions, true)
      return { ...question, choices, name: String(question.answer) }
    }
  }

  shouldCollect({ content }) {
    if (content === 'stop') return true

    switch (this.mode) {
      case 'QUESTION':
        return Object.keys(this.answer.choices).includes(content.toUpperCase())
      case 'IMAGE':
        return searchCards(this.cards, this.abbreviations, content).length > 0
      case 'CARD':
        return (
          !!parseCardGuess(content, true)[0] ||
          searchCards(this.cards, this.abbreviations, content).length > 0
        )
      default:
        return false
    }
  }

  guess({ author, content }) {
    if (this.mode === 'IMAGE' || this.mode === 'CARD') {
      const [key, value] = parseCardGuess(content, true)
      const embed = getEmbed({ withHeader: false }).addFields({
        name: 'User',
        value: author.username,
        inline: true,
      })

      if (this.mode === 'CARD' && key) {
        embed.addFields({ name: 'Property', value: key, inline: true })
        embed.addFields({ name: 'Value', value: value, inline: true })

        if (value === true) {
          const title =
            this.answer[key] === value
              ? '👍 Correct guess: ' + key
              : `👎 Incorrect guess: ~~${key}~~`
          const description =
            this.answer[key] === value
              ? `The card is indeed a *${key}*.`
              : `The card is not a *${key}*.`

          embed.setTitle(title).setDescription(description)
        } else {
          const isValid = Array.isArray(this.answer[key])
            ? this.answer[key].includes(value)
            : this.answer[key] === value
          const title = isValid
            ? '👍 Correct guess: ' + value
            : `👎 Incorrect guess: ~~${value}~~`
          const description = isValid
            ? `The card’s *${key}* is indeed “**${value}**”.`
            : `The card’s *${key}* is not “${value}”.`

          embed.setTitle(title).setDescription(description)
        }

        return embed
      }

      const cards = searchCards(this.cards, this.abbreviations, content)

      if (cards.length) {
        // Do not only check the first hit, otherwise it might yield a false
        // negative in case several cards match the guess. For instance, if the
        // answer is Excited Mousers and the player says “Mousers”, but the
        // first card returned is Rapid Mousers, it would count is as a miss,
        // despite the player having successfully found the card.
        if (cards.some(card => card.name === this.answer.name)) {
          return this.handleSuccess(author)
        }

        const [card] = cards

        return embed
          .setTitle(`❌ Incorrect answer: ~~${card.name}~~`)
          .setDescription(`The card is not ${card.name}, try again!`)
          .addFields({ name: 'Guess', value: content, inline: true })
          .addFields({ name: 'Found', value: card.name, inline: true })
      }
    } else if (this.mode === 'QUESTION') {
      const letter = content.toUpperCase().trim()
      const guess = this.answer.choices[letter]

      // If the given letter is not amongst the allowed letters for that round
      // skip processing the guess entirely.
      if (typeof this.answer.choices[letter] === 'undefined') return

      // If the choice mapped to the given letter is the correct answer, end the
      // round with success. It is important to test against `this.answer.name`
      // and not `this.answer.question`, because the former is a string, just
      // like the guess, while the latter might be a number.
      return guess === this.answer.name
        ? this.handleSuccess(author)
        : this.handleFailure(author, guess)
    }
  }

  handleSuccess(author) {
    const increment = this.difficulty === 'HARD' ? +2 : +1
    const embed = getEmbed({ withHeader: false })
      .setTitle('🎉 Correct answer: ' + this.answer.name)
      .addFields({ name: 'Winner', value: author.username, inline: true })
      .addFields({ name: 'Points', value: '+' + increment, inline: true })

    this.streaks[author.id] = (this.streaks[author.id] || 0) + 1
    this.withScores && this.updateScore(author, increment)
    this.stop('SUCCESS')

    return embed
  }

  handleFailure(author, guess) {
    const streak = this.streaks[author.id]
    const embed = getEmbed({ withHeader: false })
      .setTitle(`❌ Incorrect guess: ~~${guess}~~`)
      .addFields(
        { name: 'User', value: author.username, inline: true },
        { name: 'Points', value: '-1', inline: true }
      )

    if (streak > 1) {
      embed.setDescription(
        `You just ended your streak of ${streak} correct answers in a row, ${author}!`
      )
    }

    delete this.streaks[author.id]
    this.withScores && this.updateScore(author, -1)
    this.stop('FAILURE')

    return embed
  }

  handleAbort({ author }) {
    if (author.id !== this.initiator.id && author.id !== KITTY_ID) return

    const answer = this.mode !== 'QUESTION' ? this.answer.name : '***'
    const embed = getEmbed({ withHeader: false })
      .setTitle('🔌 Trivia stopped')
      .addFields({
        name: 'Initiator',
        value: this.initiator.username,
        inline: true,
      })
      .addFields({ name: 'Answer', value: answer, inline: true })

    this.stop('ABORT')

    return embed
  }

  stop(reason) {
    if (reason !== 'TIMEOUT') this.collector.stop()
    this.mode =
      this.difficulty =
      this.duration =
      this.answer =
      this.initiator =
      this.collector =
        null
    this.halfTimer = clearTimeout(this.halfTimer)
  }

  announceTrivia(interaction) {
    const embed = getEmbed({ withHeader: false })
      .addFields({
        name: 'Initiator',
        value: interaction.user.username,
        inline: true,
      })
      .addFields({
        name: 'Duration',
        value: this.duration + ' seconds',
        inline: true,
      })

    if (this.mode === 'CARD') {
      return interaction.reply({
        embeds: [
          embed
            .setTitle('🔮  Card trivia started')
            .setDescription(
              `You can ask for hints like \`pirate\` or \`neutral\`, and issue guesses like \`gifted\` or \`rof\`.`
            ),
        ],
      })
    } else if (this.mode === 'IMAGE') {
      return this.canvas.getAttachment(this.answer.image).then(attachment => {
        const difficulty = capitalize(this.difficulty || '')

        embed
          .setTitle('🔮  Image trivia started')
          .setDescription(`You can issue guesses like \`gifted\` or  \`rof\`.`)
          .addFields({
            name: 'Difficulty',
            value: difficulty || 'Regular',
            inline: true,
          })

        return interaction.reply({ files: [attachment], embeds: [embed] })
      })
    } else if (this.mode === 'QUESTION') {
      return interaction.reply({
        embeds: [
          embed
            .setTitle('🔮  ' + this.answer.question)
            .setDescription(
              Object.keys(this.answer.choices)
                .map(
                  letter => ' ' + letter + '. ' + this.answer.choices[letter]
                )
                .join('\n')
            )
            .addFields({ name: 'Attempts', value: '1', inline: true }),
        ],
      })
    }
  }

  async updateScore(user, delta) {
    try {
      await api.setScore(user.id, this.guildId, delta)
      console.log(`Update ${user.id}’s score by ${delta}.`)
    } catch (error) {
      console.error(error)
    }
  }

  async score(interaction) {
    const embed = getEmbed().setTitle('🏅 Trivia score')

    try {
      const id = interaction.member.id
      const scores = await api.getScores(interaction.guild.id)
      const score = scores[id]
      const groupScores = groupScoresByPoints(scores)
      const scoresByPoints = Object.keys(scores).reduce(groupScores, {})
      const position = Object.keys(scoresByPoints)
        .sort((a, b) => +b - +a)
        .findIndex(score => scoresByPoints[score].includes(id))

      embed.setDescription(
        position > -1
          ? `You are ${getOrdinalSuffix(position + 1)} with ${score} points.`
          : score
          ? `Your score is ${score}.`
          : 'No scores yet.'
      )

      return interaction.reply({ embeds: [embed], ephemeral: true })
    } catch (error) {
      console.error(error)

      embed.setDescription(
        error.name === 'AbortError'
          ? 'It looks like the storage service (jsonbin.org) is not responsive. Try again later!'
          : 'Failed to get your score. Try again later.'
      )

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }
  }

  async scores(interaction) {
    const embed = getEmbed().setTitle('🏅 Trivia scores')

    try {
      const scores = await api.getScores(interaction.guild.id)

      embed.setDescription(formatTriviaScores(scores).join('\n'))

      return interaction.reply({ embeds: [embed] })
    } catch (error) {
      embed.setDescription(
        error.name === 'AbortError'
          ? 'It looks like the storage service (jsonbin.org) is not responsive. Try again later!'
          : 'Failed to get scores. Try again later.'
      )

      return interaction.reply({ embeds: [embed] })
    }
  }
}
