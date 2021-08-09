const legend = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}

const row = {
  marginBottom: '0.25em',
}

const handButton = {
  padding: 0,
  border: '1px solid rgba(222, 215, 164, 0.5)',
  borderRadius: '0.15em',
  backgroundColor: 'transparent',
  color: 'var(--beige)',
  font: 'inherit',
  textTransform: 'uppercase',
  textAlign: 'center',
  height: '100%',
  fontSize: '150%',
  transition: '250ms',

  ':disabled': {
    opacity: 0.5,
  },

  ':not(:disabled):hover': {
    cursor: 'pointer',
    backgroundColor: 'var(--beige)',
    color: 'var(--black)',
  },

  '[aria-pressed="true"]': {
    cursor: 'pointer',
    backgroundColor: 'var(--beige)',
    color: 'var(--black)',
  },
}

const expandButton = {
  marginLeft: '1em',
  textTransform: 'uppercase',
}

export default {
  legend,
  row,
  handButton,
  expandButton,
}
