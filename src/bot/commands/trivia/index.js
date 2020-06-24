import StateMachine from 'javascript-state-machine'
import Canvas from 'canvas'
import Discord from 'discord.js'
import cards from '../../../data/cards'
import api from '../../../helpers/api'
import formatTriviaScores from '../../../helpers/formatTriviaScores'
import arrayRandom from '../../../helpers/arrayRandom'
import getRandomQuestion from '../../../helpers/getRandomQuestion'
import searchCards from '../../../helpers/searchCards'
import getChannelId from '../../../helpers/getChannelId'
import parseCardGuess from '../../../helpers/parseCardGuess'
import parseTriviaSettings from '../../../helpers/parseTriviaSettings'
import questions from './questions'

const KITTY_ID = '368097495605182483'

const random = (min, max) => min + Math.random() * (max - min)
const BASE_URL = 'https://stormbound-kitty.com'
const canvas = Canvas.createCanvas(150, 150)
const ctx = canvas.getContext('2d')

const trivia = new StateMachine({
  init: 'STOPPED',

  data: {
    answer: null,
    channel: null,
    duration: 60,
    cropCenter: null,
    cropSize: 50,
    initiator: null,
    mode: null,
    timers: [],
    useRandomLetters: true,
    streaks: {},
  },

  transitions: [
    { name: 'start', from: 'STOPPED', to: 'RUNNING' },
    { name: 'stop', from: 'RUNNING', to: 'FROZEN' },
    { name: 'unfreeze', from: 'FROZEN', to: 'STOPPED' },
  ],

  methods: {
    inspect: function (author) {
      if (author.id !== KITTY_ID) return

      console.log({
        answer: this.answer,
        channel: this.channel.id,
        duration: this.duration,
        cropCenter: this.cropCenter,
        cropSize: this.cropSize,
        initiator: this.initiator,
        mode: this.mode,
        state: this.state,
        streaks: this.streaks,
        questions: questions.length,
        useRandomLetters: this.useRandomLetters,
      })
    },

    configure: function (message, author) {
      if (author.id !== KITTY_ID) return

      const [key, value] = message.replace('configure', '').trim().split(/\s+/g)

      try {
        this[key] = JSON.parse(value)
        this.channel.send(
          `<@${KITTY_ID}> Key \`${key}\` set to \`${this[key]}\`.`
        )
      } catch (error) {
        console.error(error)
      }
    },

    halfTime: function (time) {
      const message = `⏳ Half the time has run out, hurry up!`

      if (!this.channel) return

      if (this.mode === 'IMAGE') {
        Canvas.loadImage(BASE_URL + '/assets/images/cards/' + this.answer.image)
          .then(image => this.getAttachment(image, 1.75))
          .then(attachment => this.channel.send(message, attachment))
      } else {
        this.channel.send(message)
      }
    },

    timeout: function () {
      if (this.channel) {
        const answer =
          this.mode !== 'QUESTION'
            ? `The answer was “**${this.answer.name}**”!`
            : ''

        this.channel.send(`⌛️ Time’s up! ${answer}`)
      }

      this.stop()
    },

    getAttachment: function (image, multiplier = 1) {
      // This is the percentage of the image around the edges we do not want to
      // crop in to avoid having mostly padding.
      const boundary = 18

      // The multiplier is used to zoom out at half time if the image has not
      // been found yet.
      const cropSize = this.cropSize * multiplier

      // The top-left corner of the image should be computed randomly between
      // the top-left boundary and the bottom right boundary. For a 300x300
      // image, it gives a range of 60 to 240 pixels with a 20% boundary. If the
      // crop center has already been defined however, the top-left corner is
      // computed from the focal point, minus half the crop size on both axis.
      const startX = this.cropCenter
        ? this.cropCenter[0] - cropSize / 2
        : random(
            (image.width * boundary) / 100,
            image.width - (image.width * boundary) / 100 - cropSize
          )
      const startY = this.cropCenter
        ? this.cropCenter[1] - cropSize / 2
        : random(
            (image.height * boundary) / 100,
            image.height - (image.height * boundary) / 100 - cropSize
          )

      // If there is no image focal point just, define the coordinates of the
      // center of the crop area so the zoom out can be focused on the exact
      // same point.
      if (!this.cropCenter) {
        this.cropCenter = [startX + cropSize / 2, startY + cropSize / 2]
      }

      const coords = [startX, startY]
      const area = [cropSize, cropSize]
      const dimensions = [canvas.width, canvas.height]
      const args = [image, ...coords, ...area, 0, 0, ...dimensions]

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(...args)

      if (this.difficulty === 'HARD') {
        ctx.putImageData(this.grayscale(), 0, 0)
      }

      return new Discord.MessageAttachment(canvas.toBuffer(), 'trivia_img.png')
    },

    grayscale: function () {
      const image = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
      const pixels = image.data

      for (var i = 0; i < pixels.length; i += 4) {
        const lightness = parseInt(
          (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
        )

        pixels[i] = lightness
        pixels[i + 1] = lightness
        pixels[i + 2] = lightness
      }

      return image
    },

    onStart: function () {
      if (this.mode === 'CARD') {
        this.answer = arrayRandom(cards.filter(card => !card.token))
      } else if (this.mode === 'IMAGE') {
        this.answer = arrayRandom(cards.filter(card => !card.token))

        Canvas.loadImage(BASE_URL + '/assets/images/cards/' + this.answer.image)
          .then(image => this.getAttachment(image))
          .then(attachment => this.channel.send('', attachment))
      } else if (this.mode === 'QUESTION') {
        const { question, choices } = getRandomQuestion(this.useRandomLetters)

        // Store the answer in a `name` property to align with the `CARD` mode.
        this.answer = { ...question, choices, name: String(question.answer) }
      }

      this.timers.push(
        setTimeout(this.timeout.bind(this), this.duration * 1000)
      )
      this.timers.push(
        setTimeout(this.halfTime.bind(this), (this.duration * 1000) / 2)
      )
    },

    initialise: function (message, author) {
      const { mode, duration, difficulty } = parseTriviaSettings(message)

      if (!mode) return
      this.difficulty = difficulty
      this.duration = duration
      this.initiator = author
      this.mode = mode

      this.start()

      if (mode === 'CARD') {
        return `🔮 Trivia started! You have ${duration} seconds to guess the card. You can ask questions and issue guesses with \`!trivia <term>\`, like \`!trivia pirate\` or \`!trivia rof\`.`
      } else if (mode === 'IMAGE') {
        return `🔮 Trivia started! You have ${duration} seconds to guess the card. You can issue guesses with \`!trivia <card>\`, like \`!trivia rof\`.`
      } else if (mode === 'QUESTION') {
        return (
          `❔ **${this.answer.question}** (${this.duration} seconds)\n` +
          Object.keys(this.answer.choices)
            .map(letter => ' ' + letter + '. ' + this.answer.choices[letter])
            .join('\n')
        )
      }
    },

    onStop: function () {
      // Freeze the game for 5 seconds after a round has been completed to avoid
      // chaining them too fast and making the whole thing a little too hectic.
      setTimeout(
        () => this.unfreeze(),
        process.env.NODE_ENV === 'development' ? 0 : 5000
      )

      this.answer = null
      this.difficulty = null
      this.duration = 60
      this.initiator = null
      this.mode = null
      this.timers.forEach(clearTimeout)
      this.timers = []
      this.cropCenter = null
    },

    abort: function (author) {
      if (!this.initiator) return
      if (author.id !== this.initiator.id && author.id !== KITTY_ID) return

      const username = this.initiator.username
      const answer =
        this.mode !== 'QUESTION'
          ? `The answer was “**${this.answer.name}**.”`
          : ''

      this.stop()

      return `🔌 ${username} originally started the trivia, and now they’re ending it. ${answer}`
    },

    success: function (author) {
      const answer = this.answer.name
      const increment = this.difficulty === 'HARD' ? +2 : +1

      api
        .setScore(author.id, increment)
        .then(() =>
          console.log(
            `Added ${increment} point${increment === 1 ? '' : 's'} to ${
              author.id
            }`
          )
        )
        .catch(console.error.bind(console))

      this.stop()

      return `🎉 Correct! The answer was “**${answer}**”. Congratulations ${author}!`
    },

    guess: function (message, author) {
      if (this.mode === 'CARD' || this.mode === 'IMAGE') {
        const [key, value] = parseCardGuess(message)

        if (this.mode === 'CARD' && key) {
          if (value === true) {
            const lead = key === 'elder' ? 'an' : 'a'
            return this.answer[key] === value
              ? `👍 Yes, the card is ${lead} *${key}*.`
              : `👎 No, the card is not ${lead} *${key}*.`
          } else {
            return this.answer[key] === value
              ? `👍 Yes, the card’s *${key}* is indeed “**${value}**”.`
              : `👎 No, the card’s *${key}* is not “${value}”.`
          }
        }

        const [card] = searchCards(message)

        if (card) {
          if (card.name === this.answer.name) return this.success(author)
          else return `❌ The card is not “${card.name}”, try again!`
        }
      } else if (this.mode === 'QUESTION') {
        const letter = message.toUpperCase().trim()
        const guess = this.answer.choices[letter]

        // If the given letter is not amongst the allowed letters for that round
        // skip processing the guess entirely.
        if (typeof this.answer.choices[letter] === 'undefined') return

        // If the choice mapped to the given letter is the correct answer,
        // end the round with a success. It is important to test against
        // `this.answer.name` and not `this.answer.question`, because the former
        // is a string, just like the guess, while the latter might be a number.
        if (guess === this.answer.name) {
          // Increment the streak here instead of within the `success` method
          // because we do not want to count streaks for the card trivia.
          this.streaks[author.id] = (this.streaks[author.id] || 0) + 1

          return this.success(author)
        }

        const streak = this.streaks[author.id]
        const streakMessage =
          streak > 1
            ? ` You just ended your streak of ${streak} correct answers in a row, ${author}!`
            : ''

        api
          .setScore(author.id, -1)
          .then(() => console.log('Subtracted 1 point from ' + author.id))
          .catch(console.error.bind(console))

        delete this.streaks[author.id]
        this.stop()

        return `❌ Unfortunately the answer is not *“${guess}”*.${streakMessage}`
      }
    },

    leaderboard: function () {
      api
        .getScores()
        .then(formatTriviaScores)
        .then(output =>
          this.channel.send(output, { allowedMentions: { users: [] } })
        )
        .catch(() => {
          this.channel.send('🏅 Failed to get scores. Try again later.')
        })
    },
  },
})

export default {
  command: 'trivia',
  ping: false,
  help: function () {
    return `🔮  **Trivia:** Initiate a card, question, or image trivia (only in <#trivia>). It accepts an optional duration in seconds (and the keyword \`hard\` for grayscale image trivia). For instance, \`!${this.command} card\`, \`!${this.command} question\`, \`!${this.command} image 30\`, \`!${this.command} image hard\`. Scores can be displayed with \`!${this.command} scores\`.`
  },
  handler: function (message, client, messageObject) {
    const { author } = messageObject
    const channelId = getChannelId(messageObject, this)

    if (!channelId) return

    // It is necessary to store the channel to be able to send messages that are
    // not answers to incoming users’ message, such as the result of a timeout.
    if (!trivia.channel) {
      trivia.channel = client.channels.cache.get(channelId)
    }

    if (trivia.can('start') && message.startsWith('configure')) {
      return trivia.configure(message, author)
    }

    message = message.toLowerCase()

    if (message === 'inspect') return trivia.inspect(author)
    if (message === 'scores') return trivia.leaderboard()
    if (message === 'stop') return trivia.abort(author)

    if (trivia.can('start')) return trivia.initialise(message, author)
    if (trivia.can('stop')) return trivia.guess(message.trim(), author)
  },
}
