const link = {
  color: 'currentColor',
  'text-decoration-skip': 'skip',
  'text-decoration-skip-ink': 'auto',
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
    filter: 'grayscale(1)',
    cursor: 'default',
  },

  ':not(:disabled):hover': {
    color: 'var(--beige)',
  },
}

const newTab = {
  fontSize: '80%',
  marginLeft: '0.5ch',
  transform: 'translateY(10%)',
  opacity: 0.75,
}

export default { link, newTab, buttonAsLink }
