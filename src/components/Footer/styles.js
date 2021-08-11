const footer = {
  padding: '1em',
  background: 'linear-gradient(to top, transparent, #ded7a414)',
  position: 'relative',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background:
      'linear-gradient(to right, transparent, var(--beige), transparent)',
  },
}

const inner = {
  margin: '0 auto',
  padding: '2em 0 1em',
  width: '1200px',
  maxWidth: '100%',
}

const info = {
  maxWidth: '40ch',
  marginBottom: 'var(--s-small)',
}

const icon = {
  transform: 'translateY(2px)',
  margin: '0 0.25em',
  color: 'var(--beige)',
}

const list = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
}

const heading = {
  color: 'var(--beige)',
  textTransform: 'uppercase',
  marginBottom: 'var(--s-base)',
}

const item = {
  margin: '0.3em 0',
  '> a': { textDecoration: 'none' },
}

export default {
  footer,
  inner,
  info,
  icon,
  list,
  heading,
  item,
}
