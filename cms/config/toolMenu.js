import { isAdmin } from './access'

export default function toolMenu(props) {
  const tools = isAdmin()
    ? props.tools
    : props.tools.filter(tool => tool.name === 'default')

  return props.renderDefault({ ...props, tools })
}
