const entryPseudo = {
  content: '""',
  position: 'absolute',
  top: '0.25em',
  bottom: '0.25em',
  border: 'inherit',
  width: '0.25em',
}

const entry = ({ isYou }) => ({
  padding: '0.5em 0',
  fontSize: '120%',
  display: 'flex',
  border: isYou ? '1px solid var(--dark-beige)' : undefined,
  position: isYou ? 'relative' : undefined,
  '::after': isYou
    ? {
        ...entryPseudo,
        left: '100%',
        borderLeftColor: 'var(--black)',
      }
    : undefined,

  '::before': isYou
    ? {
        ...entryPseudo,
        right: '100%',
        borderRightColor: 'var(--black)',
      }
    : undefined,
})

const name = {
  textDecoration: 'none',
  borderBottom: '1px solid transparent',

  ':hover': {
    borderBottomColor: 'currentColor',
  },
}

const toc = {
  paddingLeft: '1.4em',
  margin: 0,
  fontSize: '80%',
}

const content = {
  marginLeft: '1em',
}

const icon = {
  position: 'relative',
  top: '0.1em',
  fontSize: '220%',
  opacity: 0.5,
  color: 'var(--beige)',
}

const summary = {
  textTransform: 'uppercase',
  color: 'var(--beige)',
  fontSize: '75%',
}

export default {
  entry,
  name,
  toc,
  content,
  icon,
  summary,
}
