import StateMachine from 'javascript-state-machine'
import Canvas from 'canvas'
import Discord from 'discord.js'
import cards from '../../../data/cards'
import api from '../../../helpers/api'
import capitalise from '../../../helpers/capitalise'
import formatTriviaScores from '../../../helpers/formatTriviaScores'
import arrayRandom from '../../../helpers/arrayRandom'
import getRandomQuestion from '../../../helpers/getRandomQuestion'
import searchCards from '../../../helpers/searchCards'
import getChannelId from '../../../helpers/getChannelId'
import getEmbed from '../../../helpers/getEmbed'
import parseCardGuess from '../../../helpers/parseCardGuess'
import parseTriviaSettings from '../../../helpers/parseTriviaSettings'
import questions from './questions'

const KITTY_ID = '368097495605182483'

const random = (min, max) => min + Math.random() * (max - min)
const BASE_URL = 'https://stormbound-kitty.com'

const TriviaMachine = StateMachine.factory({
  init: 'STOPPED',

  data: {
    answer: null,
    channel: null,
    difficulty: null,
    duration: 60,
    cropCenter: null,
    cropSize: 50,
    initiator: null,
    mode: null,
    timers: [],
    useRandomLetters: true,
    streaks: {},
    ctx: Canvas.createCanvas(150, 150).getContext('2d'),
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

        return getEmbed({ withHeader: false })
          .setTitle('Configuration')
          .addFields(
            { name: 'User', value: `<@${KITTY_ID}> `, inline: true },
            { name: 'Key', value: key, inline: true },
            { name: 'Value', value: this[key], inline: true }
          )
      } catch (error) {
        console.error(error)
      }
    },

    halfTime: function () {
      const embed = getEmbed({ withHeader: false })
        .setTitle('⏳ Half time!')
        .setDescription(`Only ${this.duration / 2} seconds left, hurry up!`)

      if (!this.channel) return

      if (this.mode === 'IMAGE') {
        Canvas.loadImage(BASE_URL + '/assets/images/cards/' + this.answer.image)
          .then(image => this.getAttachment(image, 1.75))
          .then(attachment => this.channel.send({ files: [attachment], embed }))
      } else {
        this.channel.send(embed)
      }
    },

    timeout: function () {
      if (this.channel) {
        const embed = getEmbed({ withHeader: false }).setTitle('⌛️ Time’s up!')

        if (this.mode !== 'QUESTION') {
          embed.setDescription(`The answer was “**${this.answer.name}**”!`)
        }

        this.channel.send(embed)
      }

      this.stop()
    },

    getAttachment: function (image, multiplier = 1) {
      // This is the percentage of the image around the edges we do not want to
      // crop in to avoid having mostly padding.
      const boundary = 18

      // The multiplier is used to zoom out at half time if the image has not
      // been found yet.
      const crop = this.cropSize * multiplier

      // The top-left corner of the image should be computed randomly between
      // the top-left boundary and the bottom right boundary. For a 300x300
      // image, it gives a range of 60 to 240 pixels with a 20% boundary. If the
      // crop center has already been defined however, the top-left corner is
      // computed from the focal point, minus half the crop size on both axis.
      const startX = this.cropCenter
        ? this.cropCenter[0] - crop / 2
        : random(
            (image.width * boundary) / 100,
            image.width - (image.width * boundary) / 100 - crop
          )
      const startY = this.cropCenter
        ? this.cropCenter[1] - crop / 2
        : random(
            (image.height * boundary) / 100,
            image.height - (image.height * boundary) / 100 - crop
          )

      // If there is no image focal point just, define the coordinates of the
      // center of the crop area so the zoom out can be focused on the exact
      // same point.
      if (!this.cropCenter) {
        this.cropCenter = [startX + crop / 2, startY + crop / 2]
      }

      const { width, height } = this.ctx.canvas
      const args = [image, startX, startY, crop, crop, 0, 0, width, height]

      this.ctx.clearRect(0, 0, width, height)
      this.ctx.drawImage(...args)

      if (this.difficulty === 'HARD') {
        this.ctx.putImageData(this.grayscale(), 0, 0)
      }

      return new Discord.MessageAttachment(
        this.ctx.canvas.toBuffer(),
        'trivia_img.png'
      )
    },

    grayscale: function () {
      const { width, height } = this.ctx.canvas
      const image = this.ctx.getImageData(0, 0, width, height)
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
        const embed = getEmbed({ withHeader: false })
          .setTitle('🔮  Card trivia started')
          .setDescription(
            `You can ask questions and issue guesses with \`!trivia <term>\`, like \`!trivia pirate\` or \`!trivia rof\`.`
          )
          .addFields(
            { name: 'Duration', value: duration + ' seconds', inline: true },
            { name: 'Initiator', value: author.username, inline: true }
          )

        return embed
      } else if (mode === 'IMAGE') {
        return Canvas.loadImage(
          BASE_URL + '/assets/images/cards/' + this.answer.image
        )
          .then(image => this.getAttachment(image))
          .then(attachment => {
            const embed = getEmbed({ withHeader: false })
              .setTitle('🔮  Image trivia started')
              .setDescription(
                `You can issue guesses with \`!trivia <card>\`, like \`!trivia rof\`.`
              )
              .addFields(
                { name: 'Initiator', value: author.username, inline: true },
                {
                  name: 'Duration',
                  value: duration + ' seconds',
                  inline: true,
                },
                {
                  name: 'Difficulty',
                  value: capitalise(
                    (this.difficulty || 'Regular').toLowerCase()
                  ),
                  inline: true,
                }
              )

            return { files: [attachment], embed }
          })
      } else if (mode === 'QUESTION') {
        const embed = getEmbed({ withHeader: false })
          .setTitle('🔮  ' + this.answer.question)
          .setDescription(
            Object.keys(this.answer.choices)
              .map(letter => ' ' + letter + '. ' + this.answer.choices[letter])
              .join('\n')
          )
          .addFields(
            { name: 'Duration', value: duration + ' seconds', inline: true },
            { name: 'Initiator', value: author.username, inline: true }
          )

        return embed
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

      const initiator = this.initiator
      const answer = this.mode !== 'QUESTION' ? this.answer.name : '***'

      this.stop()

      return getEmbed({ withHeader: false })
        .setTitle('🔌 Trivia stopped')
        .addFields(
          {
            name: 'Answer',
            value: answer,
            inline: true,
          },
          { name: 'Initiator ', value: initiator.username, inline: true }
        )
    },

    success: function (author) {
      const answer = this.answer.name
      const increment = this.difficulty === 'HARD' ? +2 : +1

      api
        .setScore(author.id, this.guildId, increment)
        .then(() =>
          console.log(
            `Added ${increment} point${increment === 1 ? '' : 's'} to ${
              author.id
            }`
          )
        )
        .catch(console.error.bind(console))

      this.stop()

      return getEmbed({ withHeader: false })
        .setTitle('🎉 Correct answer: ' + answer)
        .addFields(
          { name: 'Winner', value: author.username, inline: true },
          { name: 'Points', value: '+' + increment, inline: true }
        )
    },

    guess: function (message, author) {
      if (this.mode === 'CARD' || this.mode === 'IMAGE') {
        const [key, value] = parseCardGuess(message)
        const embed = getEmbed({ withHeader: false })

        if (this.mode === 'CARD' && key) {
          embed.addFields(
            { name: 'User', value: author.username, inline: true },
            { name: 'Property', value: key, inline: true },
            { name: 'Value', value: value, inline: true }
          )

          if (value === true) {
            const lead = key === 'elder' ? 'an' : 'a'

            if (this.answer[key] === value) {
              return embed
                .setTitle('👍 Correct guess: ' + key)
                .setDescription(`The card is indeed ${lead} *${key}*.`)
            } else {
              return embed
                .setTitle(`👎 Incorrect guess: ~~${key}~~`)
                .setDescription(`The card is not ${lead} *${key}*.`)
            }
          } else {
            if (this.answer[key] === value) {
              return embed
                .setTitle('👍 Correct guess: ' + value)
                .setDescription(`The card’s *${key}* is indeed “**${value}**”.`)
            } else {
              return embed
                .setTitle(`👎 Incorrect guess: ~~${value}~~`)
                .setDescription(`The card’s *${key}* is not “${value}”.`)
            }
          }
        }

        const [card] = searchCards(message)

        if (card) {
          if (card.name === this.answer.name) return this.success(author)
          else {
            return embed
              .setTitle(`❌ Incorrect answer: ~~${card.name}~~`)
              .setDescription(`The card is not ${card.name}, try again!`)
              .addFields(
                { name: 'User', value: author.username, inline: true },
                { name: 'Guess', value: message, inline: true },
                { name: 'Found', value: card.name, inline: true }
              )
          }
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
        api
          .setScore(author.id, this.guildId, -1)
          .then(() => console.log('Subtracted 1 point from ' + author.id))
          .catch(console.error.bind(console))

        delete this.streaks[author.id]
        this.stop()

        const embed = getEmbed({ withHeader: false })
          .setTitle(`❌ Incorrect guess: ~~${guess}~~`)
          .addFields(
            { name: 'User', value: author.username, inline: true },
            { name: 'Points', value: -1, inline: true }
          )

        if (streak > 1) {
          embed.setDescription(
            ` You just ended your streak of ${streak} correct answers in a row, ${author}!`
          )
        }

        return embed
      }
    },

    leaderboard: function () {
      return api
        .getScores(this.guildId)
        .then(formatTriviaScores)
        .then(output =>
          getEmbed({ withHeader: false })
            .setTitle('Current trivia scores')
            .setDescription(output)
        )
        .catch(() =>
          getEmbed({ withHeader: false })
            .setTitle('Current trivia scores')
            .setDescription('🏅 Failed to get scores. Try again later.')
        )
    },
  },
})

const CACHE = new Map()

export default {
  command: 'trivia',
  ping: false,
  help: function () {
    return `🔮  **Trivia:** Initiate a card, question, or image trivia (only in <#trivia>). It accepts an optional duration in seconds (and the keyword \`hard\` for grayscale image trivia). For instance, \`!${this.command} card\`, \`!${this.command} question\`, \`!${this.command} image 30\`, \`!${this.command} image hard\`. Scores can be displayed with \`!${this.command} scores\`.`
  },
  handler: function (message, client, messageObject) {
    const { author } = messageObject
    const channelId = getChannelId(messageObject, this)
    const guildId = messageObject.channel.guild.id

    if (!channelId) return

    // If there is not already a trivia state machine for the current server,
    // create one and cache it.
    if (!CACHE.has(guildId)) {
      const trivia = new TriviaMachine()
      // It is necessary to store the guild ID to be able to get and set trivia
      // scores for the proper server.
      trivia.guildId = guildId
      // It is necessary to store the channel to be able to send messages that are
      // not answers to incoming users’ message, such as the result of a timeout.
      trivia.channel = client.channels.cache.get(channelId)

      CACHE.set(guildId, trivia)
    }

    const trivia = CACHE.get(guildId)

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
