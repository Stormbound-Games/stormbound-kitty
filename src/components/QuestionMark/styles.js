const mark = {
  margin: '0 0.25em',
  color: 'var(--beige)',
  transition: '250ms',
  cursor: 'help',

  '::before': {
    content: '"("',
    opacity: 0.5,
    fontFamily: 'monospace',
    transform: 'translateY(-2px)',
    display: 'inline-block',
    position: 'relative',
    transition: 'inherit',
  },

  '::after': {
    content: '")"',
    opacity: 0.5,
    fontFamily: 'monospace',
    transform: 'translateY(-2px)',
    display: 'inline-block',
    position: 'relative',
    transition: 'inherit',
  },

  ':hover': {
    color: 'inherit',

    '::before': { opacity: 1 },
    '::after': { opacity: 1 },
  },
}

export default { mark }
