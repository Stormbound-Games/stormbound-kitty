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
  padding: '0.55em',
  backgroundColor: 'transparent',
  border: '1px solid var(--dark-beige)',
  color: 'var(--white)',
  borderRadius: '0.25em',
  height: '100%',
  cursor: 'pointer',

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  ':last-of-type': {
    marginLeft: '0.5em',
  },
}

export default {
  header,
  name,

  item,
  move,
}
