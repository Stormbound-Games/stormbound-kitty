import getEmbed from '~/helpers/getEmbed'

const help = {
  command: 'help',
  label: '🤖  Help',
  aliases: [],
  help: function (content, client, messageObject) {
    const embed = getEmbed()
      .setTitle(`${this.label}`)
      .setURL('https://stormbound-kitty.com/faq')

    if (client.commands.has(content) && content !== 'help') {
      return client.commands.get(content).help(content, client, messageObject)
    }

    for (let [, command] of client.commands) {
      if (command.command !== 'help') {
        embed.addField(command.label, `\`!${command.command} help\``, true)
      }
    }

    embed.setDescription(`The following commands are allowed:`)

    return embed
  },
  handler: function (message, client, messageObject) {
    return this.help(message, client, messageObject)
  },
}

export default help
