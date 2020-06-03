import StateMachine from 'javascript-state-machine'
import { FACTIONS, RACES, RARITIES, TYPES } from '../../../constants/game'
import { KITTY_ID, TRIVIA_CHANNEL } from '../../../constants/bot'
import cards from '../../../data/cards'
import arrayRandom from '../../../helpers/arrayRandom'
import getCardsForSearch from '../../../helpers/getCardsForSearch'
import getChannelId from '../../../helpers/getChannelId'
import handleSearchAlias from '../../../helpers/handleSearchAlias'

const trivia = new StateMachine({
  init: 'STOPPED',

  data: {
    answer: null,
    channel: null,
    duration: 60,
    initiator: null,
    mode: null,
    scores: {},
    timers: [],
  },

  transitions: [
    { name: 'start', from: 'STOPPED', to: 'RUNNING' },
    { name: 'stop', from: 'RUNNING', to: 'STOPPED' },
  ],

  methods: {
    inspect: function () {
      console.log({
        answer: this.answer,
        channel: this.channel.id,
        duration: this.duration,
        initiator: this.initiator,
        mode: this.mode,
        state: this.state,
        scores: this.scores,
      })
    },

    halfTime: function (time) {
      if (this.channel) {
        this.channel.send(`⏳ Half the time has run out, hurry up!`)
      }
    },

    timeout: function () {
      if (this.channel) {
        this.channel.send(
          `⌛️ Time’s up! The answer was “**${this.answer.name}**”!`
        )
      }
      this.stop()
    },

    onStart: function () {
      if (this.mode === 'CARD') {
        this.answer = arrayRandom(cards.filter(card => !card.token))
      }

      this.timers.push(
        setTimeout(this.timeout.bind(this), this.duration * 1000)
      )
      this.timers.push(
        setTimeout(this.halfTime.bind(this), (this.duration * 1000) / 2)
      )
    },

    getTriviaSettings: function (message) {
      const mode = ((message.match(/(card)/i) || [])[1] || '').toUpperCase()
      const duration = +((message.match(/(\d+)/) || [])[1] || undefined)

      if (!mode) return {}
      if (mode === 'CARD') {
        if (isNaN(duration)) return { duration: 90, mode: mode }
        if (duration < 20) return { duration: 20, mode: mode }
        if (duration > 120) return { duration: 120, mode: mode }
      }

      return { duration, mode: mode }
    },

    initialise: function (message, author) {
      const { mode, duration } = this.getTriviaSettings(message)

      if (!mode) return

      this.duration = duration
      this.initiator = author
      this.mode = mode
      this.start()

      if (mode === 'CARD') {
        return `🔮 Trivia started! You have ${duration} seconds to guess the card. You can ask questions and issue guesses with \`!trivia is <term>\`, like \`!trivia is pirate\` or \`!trivia is rof\`.`
      }
    },

    onStop: function () {
      this.answer = null
      this.duration = 60
      this.initiator = null
      this.mode = null
      this.timers.forEach(clearTimeout)
      this.timers = []
    },

    abort: function (author) {
      if (author.id !== this.initiator.id && author.id !== KITTY_ID) return

      const username = this.initiator.username
      const answer = this.answer.name

      this.stop()

      return `🔌 ${username} originally started the trivia, and now they’re ending it. The answer was “**${answer}**”.`
    },

    success: function (author) {
      const answer = this.answer.name

      this.scores[author.id] = (this.scores[author.id] || 0) + 1
      this.stop()

      return `🎉 Correct! The answer was “**${answer}**”. Congratulations ${author}!`
    },

    parseGuess: function (message) {
      if (message === 'hero') return ['hero', true]
      if (message === 'elder') return ['elder', true]
      if (Object.keys(RARITIES).includes(message)) return ['rarity', message]
      if (Object.keys(FACTIONS).includes(message)) return ['faction', message]
      if (Object.keys(TYPES).includes(message)) return ['type', message]
      if (Object.keys(RACES).includes(message)) return ['race', message]
      const [key, value] = handleSearchAlias(message)
      if (Object.keys(this.answer).includes(key)) return [key, value]
      return []
    },

    guess: function (message, author) {
      const [key, value] = this.parseGuess(message)

      if (key) {
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

      const [card] = getCardsForSearch(message)

      if (card) {
        if (card.name === this.answer.name) return this.success(author)
        else return `❌ The card is not “${card.name}”, try again!`
      }
    },

    help: function () {
      return [
        `- \`!trivia card [20-120]\` to start a round — default to ${this.duration} seconds`,
        '- `!trivia stop` to stop the round (only for the initiator of the ongoing round)',
        '- `!trivia scores` to show scores between games (often reset)',
        '- `!trivia is <prop|guess>` to ask for a hint or guess the answer',
      ].join('\n')
    },

    leaderboard: function () {
      if (Object.keys(this.scores).length === 0) {
        return '🏅 No scores yet.'
      }

      const emojis = [' 🥇', ' 🥈', ' 🥉']
      const scores = Object.keys(this.scores).reduce((acc, id) => {
        const score = String(this.scores[id])

        return { ...acc, [score]: acc[score] ? [...acc[score], id] : [id] }
      }, {})

      return (
        '**Current scores:**\n' +
        Object.keys(scores)
          .sort((a, b) => +b - +a)
          .map((score, index) => {
            const emoji = emojis[index] || ''
            const users = scores[score].map(id => `<@${id}>`).join(' ')

            return `-${emoji} **${score} point${
              +score === 1 ? '' : 's'
            }** — ${users}`
          })
          .join('\n')
      )
    },
  },
})

export default {
  command: 'trivia',
  name: 'Stormbound trivia',
  example: 'help',
  description: `KittyBot ask a question or picks a card at random and you have to find which! (only in <#${TRIVIA_CHANNEL}>)`,
  icon: '🔮',
  ping: false,
  isAllowed: channel => channel.id === TRIVIA_CHANNEL,
  handler: function (message, client, messageObject) {
    const { author } = messageObject
    const channelId = getChannelId(messageObject, this)
    message = message.toLowerCase()

    if (!channelId) return

    // It is necessary to store the channel to be able to send messages that are
    // not answers to incoming users’ message, such as the result of a timeout.
    if (!trivia.channel) {
      trivia.channel = client.channels.cache.get(channelId)
    }

    if (message === 'help') {
      return trivia.help()
    }

    // Custom commands for Kitty to monitor/control the bot at runtime. It needs
    // to be resolved before the init method as the latter swallows messages.
    if (author.id === KITTY_ID && message === 'inspect') {
      return trivia.inspect()
    }

    if (trivia.can('start') && message === 'scores') {
      return trivia.leaderboard()
    }

    if (trivia.can('start')) {
      return trivia.initialise(message, author)
    }

    if (trivia.can('stop') && message === 'stop') {
      return trivia.abort(author)
    }

    if (trivia.can('stop') && message.startsWith('is ')) {
      return trivia.guess(message.replace('is ', '').trim(), author)
    }
  },
}
