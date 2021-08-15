const title = ({ isEditorialContent }) => ({
  fontSize: '100%',
  textTransform: 'uppercase',
  textAlign: 'center',
  marginTop: isEditorialContent ? 'var(--s-largest)' : 0,
  marginBottom: 'var(--s-large)',
  fontWeight: 'normal',
  color: 'var(--beige)',
  overflow: 'hidden',
})

const innerPseudo = {
  content: '""',
  height: '1px',
  width: '1em',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'currentcolor',
}

const inner = {
  position: 'relative',

  '::before': {
    ...innerPseudo,
    right: '100%',
    marginRight: 'calc(1em + 1.4142135623730951em / 2)',
  },

  '::after': {
    ...innerPseudo,
    left: '100%',
    marginLeft: 'calc(1em + 1.4142135623730951em / 2)',
  },
}

const contentPseudo = {
  content: '""',
  width: '0.5em',
  height: '0.5em',
  position: 'absolute',
  border: '1px solid',
  transform: 'translateY(-50%) rotate(45deg)',
  top: '50%',
}

const content = {
  position: 'relative',
  display: 'inline-block',

  '::before': {
    ...contentPseudo,
    right: '100%',
    marginRight: '1em',
  },

  '::after': {
    ...contentPseudo,
    left: '100%',
    marginLeft: '1em',
  },
}

export default { title, inner, content }
