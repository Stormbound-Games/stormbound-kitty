import Discord from 'discord.js'

export default {
  command: 'help',
  help: function (content, client, messageObject) {
    const embed = new Discord.MessageEmbed()

    embed
      .setColor('#D7598B')
      .setTitle(`❔  Help`)
      .setURL('https://stormbound-kitty.com')

    let commands = []

    if (client.commands.has(content) && content !== 'help') {
      return client.commands.get(content).help(content, client, messageObject)
    }

    for (let [, command] of client.commands) {
      if (command.command !== 'help') commands.push(command.command)
    }

    embed.setDescription(
      `The following commands are allowed: ${commands
        .map(
          command =>
            `\`!${command}\`${command === 'trivia' ? ` (only in #trivia)` : ''}`
        )
        .join(', ')}.\n\n
         Use \`!help <command>\` or \`!<command> help\` to get more information about a command and how to use it.`
    )

    return embed
  },
  handler: function (message, client) {
    return this.help(message, client)
  },
}
