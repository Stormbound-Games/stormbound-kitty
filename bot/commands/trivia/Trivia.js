import api from '~/helpers/triviapi'
import arrayRandom from '~/helpers/arrayRandom'
import capitalize from '~/helpers/capitalize'
import formatTriviaScores, {
  groupScoresByPoints,
} from '~/helpers/formatTriviaScores'
import getEmbed from '~/helpers/getEmbed'
import getRandomQuestion from '~/helpers/getRandomQuestion'
import getTriviaQuestions from '~/helpers/getTriviaQuestions'
import parseCardGuess from '~/helpers/parseCardGuess'
import parseTriviaSettings from '~/helpers/parseTriviaSettings'
import searchCards from '~/helpers/searchCards'
import getOrdinalSuffix from '~/helpers/getOrdinalSuffix'
import Canvas from './Canvas'

const KITTY_ID = '368097495605182483'

export default class Trivia {
  constructor({
    guildId,
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
      this.user =
      this.initiator =
      this.collector =
        null
    this.streaks = []
    this.cards = cards
    this.abbreviations = abbreviations
    this.guildId = guildId
    this.questions = getTriviaQuestions(cards, brawls)
    this.canvas = new Canvas()
  }

  start({ author, channel, content }) {
    const { mode, difficulty, duration } = parseTriviaSettings(content)

    if (this.mode || !mode) return

    this.mode = mode
    this.difficulty = difficulty
    this.duration = duration
    this.initiator = author
    this.answer = this.defineAnswer()
    this.collector = this.createCollector(channel)
    this.canvas.setDifficulty(difficulty)
    this.getTriviaDisplay(channel)
    this.halfTimer = setTimeout(
      () => this.halfTime(channel),
      (this.duration / 2) * 1000
    )
  }

  halfTime(channel) {
    const embed = getEmbed({ withHeader: false })
      .setTitle('⏳ Half time!')
      .setDescription(`Only ${this.duration / 2} seconds left, hurry up!`)

    if (this.mode === 'IMAGE') {
      this.canvas
        .getAttachment(this.answer.image, 1.75)
        .then(attachment => channel.send({ files: [attachment], embed }))
    } else {
      channel.send(embed)
    }
  }

  createCollector(channel) {
    const options = { time: this.duration * 1000 }
    const collector = channel.createMessageCollector(
      message => this.shouldCollect(message),
      options
    )

    collector.on('collect', message => {
      const output =
        message.content === 'stop'
          ? this.handleAbort(message)
          : this.guess(message)

      message.channel.send(output)
    })

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        const embed = getEmbed({ withHeader: false }).setTitle('⌛️ Time’s up!')

        if (this.mode !== 'QUESTION') {
          embed.setDescription(`The answer was “**${this.answer.name}**”!`)
        }

        channel.send(embed)
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
      const embed = getEmbed({ withHeader: false }).addField(
        'User',
        author.username,
        true
      )

      if (this.mode === 'CARD' && key) {
        embed.addField('Property', key, true)
        embed.addField('Value', value, true)

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

      const [card] = searchCards(this.cards, this.abbreviations, content)

      if (card) {
        if (card.name === this.answer.name) {
          return this.handleSuccess(author)
        }

        return embed
          .setTitle(`❌ Incorrect answer: ~~${card.name}~~`)
          .setDescription(`The card is not ${card.name}, try again!`)
          .addField('Guess', content, true)
          .addField('Found', card.name, true)
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
      .addField('Winner', author.username, true)
      .addField('Points', '+' + increment, true)

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
        { name: 'Points', value: -1, inline: true }
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
      .addField('Initiator', this.initiator.username, true)
      .addField('Answer', answer, true)

    this.stop('ABORT')

    return embed
  }

  stop(reason) {
    if (reason !== 'TIMEOUT') this.collector.stop()
    this.mode =
      this.difficulty =
      this.duration =
      this.answer =
      this.user =
      this.initiator =
      this.collector =
        null
    this.halfTimer = clearTimeout(this.halfTimer)
  }

  getTriviaDisplay(channel) {
    const embed = getEmbed({ withHeader: false })
      .addField('Initiator', this.initiator.username, true)
      .addField('Duration', this.duration + ' seconds', true)

    if (this.mode === 'CARD') {
      return channel.send(
        embed
          .setTitle('🔮  Card trivia started')
          .setDescription(
            `You can ask for hints like \`pirate\` or \`neutral\`, and issue guesses like \`gifted\` or \`rof\`.`
          )
      )
    } else if (this.mode === 'IMAGE') {
      return this.canvas.getAttachment(this.answer.image).then(attachment => {
        const difficulty = capitalize((this.difficulty || '').toLowerCase())

        embed
          .setTitle('🔮  Image trivia started')
          .setDescription(`You can issue guesses like \`gifted\` or  \`rof\`.`)
          .addField('Difficulty', difficulty || 'Regular', true)

        return channel.send({ files: [attachment], embed })
      })
    } else if (this.mode === 'QUESTION') {
      return channel.send(
        embed
          .setTitle('🔮  ' + this.answer.question)
          .setDescription(
            Object.keys(this.answer.choices)
              .map(letter => ' ' + letter + '. ' + this.answer.choices[letter])
              .join('\n')
          )
          .addField('Attempts', 1, true)
      )
    }
  }

  updateScore(user, delta) {
    return api
      .setScore(user.id, this.guildId, delta)
      .then(() => console.log(`Update ${user.id}’s score by ${delta}.`))
      .catch(error => console.error(error))
  }

  score({ author }) {
    const embed = getEmbed({ withHeader: false })
      .setTitle('Current trivia score')
      .addField('Member', author.username, true)

    return api
      .getScores(this.guildId)
      .then(scores => {
        const score = scores[author.id]
        const scoresByPoints = Object.keys(scores).reduce(
          groupScoresByPoints(scores),
          {}
        )
        const position = Object.keys(scoresByPoints)
          .sort((a, b) => +b - +a)
          .findIndex(score => scoresByPoints[score].includes(author.id))

        if (position > -1)
          embed.addField('Position', getOrdinalSuffix(position + 1), true)

        return embed.setDescription(
          score ? `🏅 Your score is ${score}.` : '🏅 No scores yet.'
        )
      })
      .catch(error => {
        const message =
          error.name === 'AbortError'
            ? '🏅 It looks like the storage service (jsonbin.org) is not responsive. Try again later!'
            : '🏅 Failed to get your score. Try again later.'

        return embed.setDescription(message)
      })
  }

  scores() {
    const embed = getEmbed({ withHeader: false }).setTitle(
      'Current trivia scores'
    )

    return api
      .getScores(this.guildId)
      .then(formatTriviaScores)
      .then(output => embed.setDescription(output))
      .catch(error => {
        const message =
          error.name === 'AbortError'
            ? '🏅 It looks like the storage service (jsonbin.org) is not responsive. Try again later!'
            : '🏅 Failed to get scores. Try again later.'

        return embed.setDescription(message)
      })
  }
}
