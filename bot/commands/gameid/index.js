import getEmbed from '~/helpers/getEmbed'
import api from '~/helpers/triviapi'

const gameid = {
  command: 'gameid',
  label: '🎮  Game ID',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setDescription(
        'Record your Stormbound game ID so people can look it up directly from Discord and add you in game to do friendly battles.'
      )
      .addField('Set your game ID', '`!gameid 1234567890`', true)
      .addField('Get someone’s game ID', '`!gameid @mention`', true)
  },
  handler: async function (message, client, messageObject) {
    const embed = getEmbed()
    const guildId = messageObject.channel.guild.id

    // If the message looks like a Stormbound game ID, record it as the game ID
    // of the message author.
    if (/^\d{10}$/.test(message)) {
      embed.setTitle(`${this.label}: ${messageObject.author.username}`)

      return api
        .setGameId(guildId, messageObject.author.id, message)
        .then(() =>
          embed.setDescription(`Your game ID (${message}) has been recorded.`)
        )
        .catch(error => {
          console.error(error)
          const message =
            error.name === 'AbortError'
              ? 'It looks like the storage service (jsonbin.org) is not responsive. Try again later!'
              : `There was an issue recording your game ID (${message}).`
          return embed.setDescription(message)
        })
    }

    // If the message is not a Stormbound game ID but contains a mention, read
    // the game ID of that mentioned user.
    if (messageObject.mentions.members.size > 0) {
      const target = messageObject.mentions.members.first()
      const username = target.user.username

      embed.setTitle(`${this.label}: ${target.user.username}`)

      return api
        .getGameId(guildId, target.id)
        .then(id =>
          id
            ? embed.setDescription(`${username}’s game ID is ${id}.`)
            : embed.setDescription(`${username}’s game ID is not recorded yet.`)
        )
        .catch(error => {
          console.error(error)
          const message =
            error.name === 'AbortError'
              ? 'It looks like the storage service (jsonbin.org) is not responsive. Try again later!'
              : `There was an issue finding ${username}’s game ID.`
          return embed.setDescription(message)
        })
    }

    return api
      .getGameId(guildId, messageObject.author.id)
      .then(id =>
        id
          ? embed.setDescription(`Your game ID is ${id}.`)
          : embed.setDescription('Your game ID is not recorded yet.')
      )
      .catch(error => {
        console.error(error)
        const message =
          error.name === 'AbortError'
            ? 'It looks like the storage service (jsonbin.org) is not responsive. Try again later!'
            : `There was an issue finding ${messageObject.author.id}’s game ID.`
        return embed.setDescription(message)
      })
  },
}

export default gameid
