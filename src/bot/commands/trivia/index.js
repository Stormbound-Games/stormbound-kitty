import StateMachine from 'javascript-state-machine'
import { FACTIONS, RACES, RARITIES, TYPES } from '../../../constants/game'
import { KITTY_ID, TRIVIA_CHANNEL } from '../../../constants/bot'
import cards from '../../../data/cards'
import arrayRandom from '../../../helpers/arrayRandom'
import getCardsForSearch from '../../../helpers/getCardsForSearch'
import getChannelId from '../../../helpers/getChannelId'
import handleSearchAlias from '../../../helpers/handleSearchAlias'

const DEFAULT_DURATION = 90

const trivia = new StateMachine({
  init: 'STOPPED',

  data: {
    timers: [],
    card: null,
    initiator: null,
    duration: DEFAULT_DURATION,
    channel: null,
    scores: {},
  },

  transitions: [
    { name: 'start', from: 'STOPPED', to: 'RUNNING' },
    { name: 'stop', from: 'RUNNING', to: 'STOPPED' },
  ],

  methods: {
    inspect: function () {
      console.log({
        initiator: this.initiator,
        channel: this.channel.id,
        duration: this.duration,
        card: this.card,
        state: this.state,
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
          `⌛️ Time’s up! The answer was “**${this.card.name}**”!`
        )
      }
      this.stop()
    },

    onStart: function () {
      this.card = arrayRandom(cards.filter(card => !card.token))
      this.timers.push(
        setTimeout(this.timeout.bind(this), this.duration * 1000)
      )
      this.timers.push(
        setTimeout(this.halfTime.bind(this), (this.duration * 1000) / 2)
      )
    },

    getDuration: function (message) {
      const duration = +message.trim()
      if (isNaN(duration)) return 90
      if (duration < 20) return 20
      if (duration > 120) return 120
      return duration
    },

    initialise: function (message, author) {
      this.duration = this.getDuration(message)
      this.initiator = author
      this.start()

      return `🔮 Trivia started! You have ${this.duration} seconds to guess the card. You can ask questions and issue guesses with \`!trivia is <term>\`, like \`!trivia is pirate\` or \`!trivia is rof\`.`
    },

    onStop: function () {
      this.card = null
      this.initiator = null
      this.timers.forEach(clearTimeout)
      this.timers = []
    },

    abort: function (author) {
      if (author.id !== this.initiator.id && author.id !== KITTY_ID) return

      const username = this.initiator.username
      const cardName = this.card.name
      this.stop()

      return `🔌 ${username} originally started the trivia, and now they’re ending it. The answer was “**${cardName}**”.`
    },

    success: function (author) {
      const cardName = this.card.name

      // Increment the score for the winner.
      this.scores[author.id] = (this.scores[author.id] || 0) + 1

      this.stop()

      return `🎉 Correct! The answer was “**${cardName}**”. Congratulations ${author}!`
    },

    parseGuess: function (message) {
      if (message === 'hero') return ['hero', true]
      if (message === 'elder') return ['elder', true]
      if (Object.keys(RARITIES).includes(message)) return ['rarity', message]
      if (Object.keys(FACTIONS).includes(message)) return ['faction', message]
      if (Object.keys(TYPES).includes(message)) return ['type', message]
      if (Object.keys(RACES).includes(message)) return ['race', message]
      const [key, value] = handleSearchAlias(message)
      if (Object.keys(this.card).includes(key)) return [key, value]
      return []
    },

    guess: function (message, author) {
      const [key, value] = this.parseGuess(message)

      if (key) {
        if (value === true) {
          const lead = key === 'elder' ? 'an' : 'a'
          return trivia.card[key] === value
            ? `👍 Yes, the card is ${lead} *${key}*.`
            : `👎 No, the card is not ${lead} *${key}*.`
        } else {
          return trivia.card[key] === value
            ? `👍 Yes, the card’s *${key}* is indeed “**${value}**”.`
            : `👎 No, the card’s *${key}* is not “${value}”.`
        }
      }

      const [card] = getCardsForSearch(message)

      if (card) {
        if (card.name === this.card.name) return this.success(author)
        else return `❌ The card is not “${card.name}”, try again!`
      }
    },

    help: function () {
      return [
        '- `!trivia start <20-120>` to start a round with duration (if not already started)',
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
  name: 'Card trivia',
  example: 'help',
  description: `KittyBot picks a card at random and you have to find which! (only in <#${TRIVIA_CHANNEL}>)`,
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

    if (trivia.can('start') && message.startsWith('start')) {
      return trivia.initialise(message.replace('start ', '').trim(), author)
    }

    if (trivia.can('stop') && message === 'stop') {
      return trivia.abort(author)
    }

    if (trivia.is('RUNNING') && message.startsWith('is ')) {
      return trivia.guess(message.replace('is ', '').trim(), author)
    }

    if (trivia.is('STOPPED') && message === 'scores') {
      return trivia.leaderboard()
    }

    // Custom commands for Kitty to monitor/control the bot at runtime.
    if (author.id === KITTY_ID && message === 'inspect') {
      return trivia.inspect()
    }
  },
}
