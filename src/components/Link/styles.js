const link = {
  color: 'currentColor',
  'text-decoration-skip': 'skip',
  'text-decoration-skip-ink': 'auto',
  transition: '250ms',

  ':active': { color: 'var(--beige)' },
  ':hover': { color: 'var(--beige)' },
}

const newTab = {
  fontSize: '80%',
  marginLeft: '0.5ch',
  transform: 'translateY(10%)',
}

export default { link, newTab }
