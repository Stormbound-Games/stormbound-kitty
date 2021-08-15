const info = {
  color: 'var(--white)',
  display: 'block',
  maxWidth: '40ch',
  textTransform: 'initial',
}

const toggle = {
  backgroundColor: 'transparent',
  border: 0,
  color: 'var(--beige)',
  padding: 0,
  font: 'inherit',
  cursor: 'pointer',
  borderBottom: '1px solid transparent',

  ':hover': {
    borderBottomColor: 'currentcolor',
  },
}

export default {
  info,
  toggle,
}
