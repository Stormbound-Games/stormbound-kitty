const header = {
  display: 'flex',
  margin: '0 -0.5em var(--s-base)',
  alignItems: 'flex-end',
}

const name = {
  textTransform: 'uppercase',
  marginTop: 0,
  marginBottom: 0,
  color: 'var(--beige)',
  fontSize: '100%',
  fontWeight: 'normal',
}

const item = {
  flex: '1 1 100%',
  padding: '0 0.5em',

  medium: {
    flexBasis: 'auto',

    ':last-child': {
      flexGrow: 0,
      display: 'block',
    },
  },
}

const move = {
  display: 'inline-block',
  ':last-child': { marginLeft: '1.5em' },
}

const buttons = {
  display: 'flex',
  marginBottom: '0.4em',
  marginLeft: 'var(--s-smaller)',
}

export default {
  header,
  name,
  item,
  move,
  buttons,
}
