const gradientLine = {
  content: '""',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '1px',
  backgroundImage:
    'linear-gradient(to right, transparent, var(--dark-beige), transparent)',
}

const nav = {
  display: 'flex',
  zIndex: 10,
  position: 'relative',
  paddingTop: '0.5em',

  '::after': gradientLine,

  medium: { display: 'none' },
}

const left = {
  padding: 'var(--s-base)',
  marginRight: 'auto',
}

const right = {
  padding: 'var(--s-base)',
  marginLeft: 'auto',
}

const middle = {
  padding: 'var(--s-base)',
  textDecoration: 'none',
}

const style = { nav, left, right, middle }

export default style
