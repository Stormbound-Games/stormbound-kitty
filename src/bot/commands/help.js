import COMMANDS from './'

const formatCommand = command => `${command.icon} **${command.name}** (e.g. \`!${command.command} ${command.example}\`)
       *${command.description}*`

export default () => {
  return ['', ...COMMANDS.map(formatCommand)].join('\n')
}
