const mark = {
  margin: '0 0.25em',
  color: 'var(--beige)',
  transition: '0ms',

  '::before': {
    content: '"("',
    opacity: 0.5,
    fontFamily: 'monospace',
    transform: 'scale(1.2) translateX(-1px) translateY(-2px)',
    display: 'inline-block',
    position: 'relative',
    transition: 'inherit',
    willChange: 'opacity',
  },

  '::after': {
    content: '")"',
    opacity: 0.5,
    fontFamily: 'monospace',
    transform: 'scale(1.2) translateX(1px) translateY(-2px)',
    display: 'inline-block',
    position: 'relative',
    transition: 'inherit',
    willChange: 'opacity',
  },

  ':hover': {
    color: 'inherit',

    '::before': { opacity: 1 },
    '::after': { opacity: 1 },
  },
}

const styles = { mark }

export default styles
