import StateMachine from 'javascript-state-machine'
import { FACTIONS, RACES, RARITIES, TYPES } from '../../../constants/game'
import cards from '../../../data/cards'
import arrayRandom from '../../../helpers/arrayRandom'
import getCardsForSearch from '../../../helpers/getCardsForSearch'
import handleSearchAlias from '../../../helpers/handleSearchAlias'
import { KITTY_ID, TRIVIA_CHANNEL, STORMBOUND_SERVER } from '../../handle'

const parseGuess = message => {
  if (message === 'hero') return ['hero', true]
  if (message === 'elder') return ['elder', true]
  if (Object.keys(RARITIES).includes(message)) return ['rarity', message]
  if (Object.keys(FACTIONS).includes(message)) return ['faction', message]
  if (Object.keys(TYPES).includes(message)) return ['type', message]
  if (Object.keys(RACES).includes(message)) return ['race', message]
  const [key, value] = handleSearchAlias(message)
  if (Object.keys(machine.card).includes(key)) return [key, value]
  return []
}

const machine = new StateMachine({
  init: 'STOPPED',

  data: {
    timer: null,
    card: null,
    channel: null,
    initiator: null,
    duration: 1000 * 60 * 2,
  },

  transitions: [
    { name: 'start', from: 'STOPPED', to: 'RUNNING' },
    { name: 'stop', from: 'RUNNING', to: 'STOPPED' },
  ],

  methods: {
    configure: function (key, value) {
      this[key] = value
    },

    timeout: function () {
      const cardName = this.card.name
      this.stop()
      this.client.channels.cache
        .get(this.channel)
        .send(`Time’s up! The answer was “**${cardName}**”!`)
    },

    onStart: function () {
      this.card = arrayRandom(cards.filter(card => !card.token))
      this.timer = setTimeout(this.timeout.bind(this), this.duration)
    },

    initialise: function ({ author, channel }) {
      this.initiator = author
      this.channel = getChannelId(channel)
      this.start()

      return `Trivia started! You have ${
        this.duration / 1000
      } seconds to guess the card. You can ask questions and issue guesses with \`!trivia is <term>\`, like \`!trivia is pirate\` or \`!trivia is rof\`.`
    },

    onStop: function () {
      this.card = null
      this.initiator = null
      clearTimeout(this.timer)
    },

    abort: function () {
      const username = this.initiator.username
      this.stop()

      return `${username} originally started the trivia, and now they’re ending it. Sorry!`
    },

    success: function () {
      const cardName = this.card.name
      this.stop()

      return `🎉 Correct! The answer was “**${cardName}**”. Congratulations!`
    },

    guess: function (message) {
      const [key, value] = parseGuess(message)

      if (key) {
        if (value === true) {
          const lead = key === 'elder' ? 'an' : 'a'
          return machine.card[key] === value
            ? `👍 Yes, the card is ${lead} *${key}*.`
            : `👎 No, the card is not ${lead} *${key}*.`
        } else {
          return machine.card[key] === value
            ? `👍 Yes, the card’s *${key}* is indeed “**${value}**”.`
            : `👎 No, the card’s *${key}* is not “${value}”.`
        }
      }

      const [card] = getCardsForSearch(message.replace('is ', ''))

      if (card) {
        if (card.name === this.card.name) return this.success()
        else return `❌ The card is not “${card.name}”, try again!`
      }
    },

    help: function () {
      return [
        '- `!trivia start` to start a round (if not already started)',
        '- `!trivia stop` to stop the round (only for the initiator of the ongoing round)',
        '- `!trivia is <prop|guess>` to ask for a hint or guess the answer',
      ].join('\n')
    },
  },
})

// If the trivia is initiated on the main Stormbound server, reply in the
// #trivia channel to avoid polluting the #kitty-bot channel with trivia
// games. Otherwise, reply in the message it was initiated from.
const getChannelId = channel =>
  channel.guild.id === STORMBOUND_SERVER ? TRIVIA_CHANNEL : channel.id

export default {
  command: 'trivia',
  name: 'Card trivia',
  example: 'help',
  description: 'KittyBot picks a card at random and you have to find which!',
  channel: 'trivia',
  icon: '🔮',
  handler: function (message, client, { channel, author }) {
    message = message.toLowerCase()

    // It is necessary to store the client to be able to send messages that are
    // not answers to incoming users’ message, such as the result of a timeout.
    if (!machine.client) {
      machine.configure('client', client)
    }

    if (message === 'help') {
      return machine.help()
    }

    // Make it possible to configure the trivia duration at runtime by Kitty.
    if (author.id === KITTY_ID && message.startsWith('duration')) {
      const duration = +message.replace('duration', '').trim()
      machine.configure('duration', duration)
      return `Trivia duration set to ${duration / 1000} seconds.`
    }

    if (machine.can('start') && message === 'start') {
      return machine.initialise({ author, channel })
    }

    if (
      machine.can('stop') &&
      message === 'stop' &&
      (author.id === machine.initiator.id || author.id === KITTY_ID)
    ) {
      return machine.abort()
    }

    if (machine.is('RUNNING') && message.startsWith('is ')) {
      return machine.guess(message.replace('is ', ''))
    }
  },
}
