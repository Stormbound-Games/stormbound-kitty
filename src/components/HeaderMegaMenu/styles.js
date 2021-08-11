const menu = ({ isOpen }) => ({
  position: 'absolute',
  top: '100%',
  minWidth: 'calc(230px * var(--columns))',
  backgroundColor: 'var(--black)',
  zIndex: 19,
  border: '1px solid var(--dark-beige)',
  textAlign: 'left',
  left: '-1em',
  padding: '1.5em 1.5em 0em',
  visibility: isOpen ? 'visible' : 'hidden',
  opacity: isOpen ? 1 : 0,
  pointerEvents: isOpen ? 'auto' : 'none',
  transition: '250ms 150ms',
  transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
  boxShadow: '0 1.5em 1em -1em #0000004d',

  '::after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '0.5em',
    right: '0.5em',
    height: '0.5em',
    backgroundColor: 'inherit',
    border: 'inherit',
    borderTop: 0,
  },

  small: {
    minWidth: 0,
    width: 'calc(100vw - 2em)',
    top: '100%',
  },
})

const title = {
  fontSize: '90%',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: 'var(--beige)',
  marginTop: 0,
  marginBottom: 'var(--s-smaller)',
  fontWeight: 'normal',
  borderBottom: '1px solid var(--dark-beige)',
  paddingBottom: '0.5em',

  '> a': {
    textDecoration: 'none',
  },
}

const icon = {
  fontSize: '90%',
  marginRight: '1ch',
  top: '1px',
  position: 'relative',
  stroke: 'none',
}

const newTab = {
  fontSize: '80%',
  marginLeft: '0.75ch',
}

const list = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
}

const item = {
  margin: '0.25em 0',
}

const link = ({ isActive, isNew }) => ({
  position: 'relative',
  display: 'inline-block',
  textDecoration: 'none',
  borderBottom: isActive ? '1px solid' : '1px solid transparent',
  color: isActive ? 'var(--beige)' : 'inherit',

  ':hover': {
    borderBottomColor: 'currentcolor',
  },

  '::after': isNew ? { top: 0, left: 'calc(100% + 0.5ch)' } : undefined,
})

const close = {
  display: 'block',
  backgroundColor: 'transparent',
  padding: 0,
  border: 0,
  position: 'absolute',
  top: '0.1em',
  right: '0.25em',
  width: '1.5em',
  height: '1.5em',
  lineHeight: '1.5em',
  color: 'inherit',
  font: 'inherit',
  fontSize: '200%',

  medium: {
    display: 'none',
  },
}

export default {
  menu,
  title,
  icon,
  newTab,
  list,
  item,
  link,
  close,
}
