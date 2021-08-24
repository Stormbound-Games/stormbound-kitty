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

/**
 * 1. Negate the spacing from the header to avoid duplicate spacing all around.
 * 2. Hide the navigation (from the `Header` component) when the menu is not
 *    open.
 */
const nav = ({ isMenuOpen }) => ({
  display: 'flex',
  zIndex: 10,
  margin: '0 calc(var(--s-base) * -1)' /* 1 */,
  position: 'relative',

  small: {
    '& + nav': { display: isMenuOpen ? 'block' : 'none' /* 2 */ },
  },

  '::after': gradientLine,

  medium: { display: 'none' },
})

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
