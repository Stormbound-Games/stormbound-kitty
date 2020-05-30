const formatCommand = ({
  icon,
  name,
  command,
  example,
  description,
}) => `${icon} **${name}** (e.g. \`!${command}${example ? ` ${example}` : ''}\`)
       *${description}*`

export default {
  command: 'help',
  name: 'Help',
  description: 'Get help about KittyBot’s commands',
  icon: '🤖',
  handler: function (message, client) {
    let reply = ''

    for (let [, command] of client.commands) {
      reply += '\n' + formatCommand(command)
    }

    return reply
  },
}
