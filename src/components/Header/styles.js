/**
 * 1. Make sure the header sits over the content.
 * 2. Relative positioning for the absolutely positioned mobile navigation.
 */
const header = {
  zIndex: 10 /* 1 */,
  position: 'relative' /* 2 */,
  padding: '0 var(--s-base)',
}

/**
 * 1. CSS hack to avoid the page content from shifting when the header finally
 *    loads. This really is only needed in development where `getStaticProps`
 *    (which holds the navigation data) is fetched with every request. This is
 *    unneeded (although safe) in production.
 * 2. Opaque color to cover the underlying image on the home page.
 * 3. Use the height of the mobile header instead of `100%` to have the nav menu
 *    overlap the subnav is there is one.
 * 4. Use padding instead of margin as the element has a solid background color
 *    which is not rendered behind margin.
 */
const nav = ({ isMobileNavOpen }) => ({
  minHeight: '54px' /* 1 */,
  backgroundColor: 'var(--black)' /* 2 */,
  margin: '0 1em',
  borderBottom: '1px solid var(--dark-beige)',
  paddingTop: '1em',

  small: {
    position: 'absolute',
    top: '62px' /* 3 */,
    left: 0,
    right: 0,
    margin: 0 /* 4 */,
    paddingLeft: '1em' /* 4 */,
    paddingRight: '1em' /* 4 */,
    paddingTop: 0,
    zIndex: 20,
    boxShadow: '0 1.5em 1em -1em #0000004d',
    display: isMobileNavOpen ? 'block' : 'none',
  },
})

const list = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',

  small: {
    margin: '1em 0',
    flexWrap: 'wrap',
  },

  medium: {
    flexWrap: 'nowrap',
  },
}

/**
 * 1. Position context for the active state pseudo-element.
 */
const item = ({ isRight, isSelect }) => ({
  textAlign: isSelect ? 'left' : 'center',
  position: 'relative' /* 1 */,
  marginLeft: isRight ? 'auto' : undefined,
  width: isSelect ? '250px' : undefined,
  padding: isSelect ? '0.5em 1em' : undefined,
  overflow: isSelect ? 'visible' : undefined,

  /**
   * 1. Display navigation items in 2 columns.
   */
  small: {
    flex: '0 1 50%' /* 1 */,
    marginLeft: isRight ? 0 : undefined,
    width: isSelect ? '100%' : undefined,
    flexGrow: isSelect ? 1 : undefined,

    ':nth-of-type(even) > div': {
      left: 'calc(-50vw + 1em)',
    },
  },

  medium: {
    whiteSpace: 'nowrap',
  },
})

/**
 * 1. Make sure the open action sits on top of its mega menu so the pseudo-
 *    element looks like it belongs to the menu itself.
 */
const action = ({ isActive, isOpen }) => ({
  color: isActive ? 'var(--beige)' : 'inherit',
  display: 'inline-block',
  outline: 0,
  padding: '1em',
  position: 'relative',
  textDecoration: 'none',
  zIndex: isOpen ? 20 : undefined /* 1 */,

  small: {
    padding: '0.5em 0',
  },

  ':focus': { color: 'var(--light-swarm)' },

  /**
   * 1. Pseudo-element used for the active state and for when the dropdown is
   *    open (with 2 different classes respectively).
   * 2. Make the triangle dark beige for the active state.
   */
  '::after': {
    content: '""' /* 1 */,
    width: '1em',
    height: '1em',
    position: 'absolute',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    top: 'calc(100% + 0.5em)',
    left: '50%',
    border: '1px solid var(--dark-beige)',
    borderBottom: 0,
    borderRight: 0,
    backgroundColor: 'var(--black)',
    opacity: isOpen ? 1 : 0,
    transition: 'opacity 250ms 150ms',
    backgroundImage:
      isActive && !isOpen
        ? 'linear-gradient(135deg, var(--dark-beige) 50%, var(--black) 50%)' /* 2 */
        : undefined,

    medium: {
      top: '100%',
      opacity: isActive ? 1 : undefined,
    },
  },
})

const icon = {
  fontSize: '80%',
  marginRight: '0.25em',
  verticalAlign: 'baseline',
  position: 'relative',
  top: '1px',

  '@media (min-width: 700px) and (max-width: 1000px)': {
    display: 'none',
  },
}

const styles = {
  header,
  nav,
  list,
  item,
  action,
  icon,
}

export default styles
