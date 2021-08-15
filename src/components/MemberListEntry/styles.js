const entryPseudo = {
  content: '""',
  position: 'absolute',
  top: '0.25em',
  bottom: '0.25em',
  border: 'inherit',
  width: '0.25em',
}

const entry = ({ isYou }) => ({
  padding: '0.5em 0.25em',
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

  ':hover': {
    borderBottom: '1px solid',
  },
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
  color: 'var(--dark-beige)',
  fontSize: '75%',
  marginBottom: 0,
  marginTop: 'var(--s-smallest)',
}

export default {
  entry,
  name,
  content,
  icon,
  summary,
}
