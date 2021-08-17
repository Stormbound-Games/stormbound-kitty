import getChannelId from '~/helpers/getChannelId'
import getEmbed from '~/helpers/getEmbed'
import Trivia from './Trivia'

const cache = new Map()

export default {
  command: 'trivia',
  label: '🔮  Trivia',
  ping: false,
  help: function () {
    return getEmbed({ withHeader: false })
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/trivia')
      .setDescription(
        `Initiate a card, question, or image trivia (only in #trivia, if it exists). It accepts an optional duration in seconds (and the keyword \`hard\` for grayscale image trivia).`
      )
      .addFields(
        { name: 'Start card trivia', value: '`!trivia card`', inline: true },
        { name: 'Start image trivia', value: '`!trivia image`', inline: true },
        {
          name: 'Start question trivia',
          value: '`!trivia question`',
          inline: true,
        },
        { name: 'Emit guess', value: '`<guess>`', inline: true },
        { name: 'Stop current trivia', value: '`stop`', inline: true },
        { name: 'Display scores', value: '`!trivia scores`', inline: true },
        { name: 'Display your score', value: '`!trivia score`', inline: true }
      )
  },
  handler: function (message, client, messageObject) {
    const channelId = getChannelId(messageObject, this)
    const guildId = messageObject.channel.guild.id

    if (!channelId) return

    if (!cache.has(guildId)) {
      cache.set(guildId, new Trivia({ guildId }))
    }

    const trivia = cache.get(guildId)

    if (
      message.startsWith('card') ||
      message.startsWith('image') ||
      message.startsWith('question')
    ) {
      return trivia.start(messageObject)
    } else if (message === 'scores') {
      return trivia.scores(messageObject)
    } else if (message === 'score') {
      return trivia.score(messageObject)
    }
  },
}
