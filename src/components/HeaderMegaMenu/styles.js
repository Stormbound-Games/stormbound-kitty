// 1. `--s-base` feels a little tight, and `--s-large` feels a little too spaced
//    out so sticking to arbitrary values here.
const menu = ({ isOpen }) => ({
  position: 'absolute',
  top: '100%',
  minWidth: 'calc(230px * var(--columns))',
  backgroundColor: 'var(--black)',
  zIndex: 19,
  border: '1px solid var(--dark-beige)',
  textAlign: 'left',
  left: 0,
  padding: '1.5rem 1.5rem 0em', // 1
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
    left: 'var(--s-smaller)',
    right: 'var(--s-smaller)',
    height: 'var(--s-smaller)',
    backgroundColor: 'inherit',
    border: 'inherit',
    borderTop: 0,
  },

  small: {
    minWidth: 0,
    width: 'calc(100vw - var(--s-base) * 2)',
    top: 'calc(100% + var(--s-smaller))',
    left: 'var(--s-base)',
  },
})

const title = ({ isActive }) => ({
  marginTop: 0,
  fontWeight: isActive ? 'bold' : 'normal',
  borderBottom: '1px solid var(--dark-beige)',
  paddingBottom: 'var(--s-smaller)',

  '> a': {
    textDecoration: 'none',
  },
})

const icon = {
  fontSize: '90%',
  marginRight: '1ch',
  top: '1px',
  position: 'relative',
  stroke: 'none',
}

const list = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
}

const item = {
  margin: 'var(--s-smallest) 0',
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
  position: 'absolute',
  top: '1.5em',
  right: '1.5em',

  medium: {
    display: 'none',
  },
}

const styles = {
  menu,
  title,
  icon,
  list,
  item,
  link,
  close,
}

export default styles
