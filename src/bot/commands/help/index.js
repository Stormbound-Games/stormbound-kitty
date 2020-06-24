export default {
  command: 'help',
  isAllowed: channel => channel.name !== 'trivia',
  help: function (content, client) {
    let commands = []

    if (client.commands.has(content) && content !== 'help') {
      return client.commands.get(content).help(content, client)
    }

    for (let [, command] of client.commands) {
      if (command.command !== 'help') commands.push(command.command)
    }

    return `The following commands are allowed: ${commands
      .map(
        command =>
          `\`!${command}\`${command === 'trivia' ? ` (only in <#trivia>)` : ''}`
      )
      .join(
        ', '
      )}. Use \`!help <command>\` or \`!<command> help\` to get more information about a command and how to use it.`
  },
  handler: function (message, client) {
    return this.help(message, client)
  },
}
