const link = {
  color: 'currentcolor',
  textDecorationSkip: 'skip',
  textDecorationSkipInk: 'auto',
  transition: '250ms',

  ':active': { color: 'var(--beige)' },
  ':hover': { color: 'var(--beige)' },
}

const buttonAsLink = {
  backgroundColor: 'transparent',
  border: 0,
  padding: 0,
  color: 'inherit',
  font: 'inherit',
  display: 'inline',
  textDecoration: 'underline',
  cursor: 'pointer',

  ':disabled': {
    opacity: 0.7,
    cursor: 'not-allowed',
    filter: 'grayscale(1)',
  },

  ':not(:disabled):hover': {
    color: 'var(--beige)',
  },
}

const newTab = {
  fontSize: '80%',
  marginLeft: '0.5ch',
  transform: 'translateY(10%)',
  opacity: 0.5,
}

const styles = { link, newTab, buttonAsLink }

export default styles
