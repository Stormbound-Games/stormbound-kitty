// 1. Make sure the header sits over the content.
// 2. Relative positioning for the absolutely positioned mobile navigation.
const header = {
  zIndex: 10, // 1
  position: 'relative', // 2
  padding: '0 var(--s-large)',
}

// 1. CSS hack to avoid the page content from shifting when the header finally
//    loads. This really is only needed in development where `getStaticProps`
//    (which holds the navigation data) is fetched with every request. This is
//    unneeded (although safe) in production.
const nav = ({ isMobileNavOpen }) => ({
  minHeight: '54px', // 1
  borderBottom: '1px solid var(--dark-beige)',
  paddingTop: 'var(--s-base)',

  small: {
    position: 'absolute',
    top: '62px', // 2
    left: 0,
    right: 0,
    paddingTop: 0,
    zIndex: 20,
    backgroundColor: 'var(--black)',
    boxShadow: '0 1.5em 1em -1em #0000004d',
    visibility: isMobileNavOpen ? 'visible' : 'hidden',
    opacity: isMobileNavOpen ? 1 : 0,
    pointerEvents: isMobileNavOpen ? 'auto' : 'none',
    transform: isMobileNavOpen ? 'translateY(0)' : 'translateY(-10px)',
    transition: '250ms 150ms',
  },
})

const list = {
  listStyleType: 'none',
  paddingLeft: 0,
  display: 'flex',
  flexWrap: 'wrap',
  margin: 'var(--s-base) 0',

  medium: {
    margin: 0,
    flexWrap: 'nowrap',
  },
}

// 1. Relative positioning for the absolutely positioned mega menus.
// 2. Display navigation items in 2 columns on mobile.
const item = ({ isRight }) => ({
  position: 'relative', // 1
  textAlign: 'center',
  marginLeft: isRight ? 'auto' : undefined,
  flex: '0 1 50%', // 2

  small: { ':nth-of-type(even) > div': { left: 'calc(-50vw + 1em)' } },

  medium: {
    flex: '0 1 auto',
    marginLeft: isRight ? 'auto' : undefined,
    whiteSpace: 'nowrap',
  },
})

// 1. Pseudo-element used for the active state and for when the dropdown is
//    open.
// 2. On mobile, the open menu is slightly offset from the toggle to avoid it
//    being too crowded.
// 3. Make the triangle dark beige for the active state.
const getInteractiveState = ({ isActive, isOpen }) => {
  // The header mega menu slide-in by 10px to make the apparition a little
  // smoother. The arrow should do the same to avoid breaking the impression
  // that it’s detached from the mena. It needs to slide in by half the diagonal
  // of the square used to render the arrow.
  const offset = (10 * Math.sqrt(2)) / 2

  return {
    content: '""', // 1
    width: '1em',
    height: '1em',
    position: 'absolute',
    top: 'calc(100% + var(--s-smaller))', // 2
    left: '50%',
    border: '1px solid var(--dark-beige)',
    borderBottom: 0,
    borderRight: 0,
    backgroundColor: 'var(--black)',
    opacity: isOpen ? 1 : 0,
    transition: '250ms 150ms',
    transform:
      isOpen || isActive
        ? 'translate(-50%, -50%) rotate(45deg)'
        : `translate(-50%, -50%) rotate(45deg) translate(-${offset}px, -${offset}px)`,
    backgroundImage:
      isActive && !isOpen
        ? 'linear-gradient(135deg, var(--dark-beige) 50%, transparent 50%)' // 3
        : undefined,

    medium: {
      top: '100%',
      opacity: isActive ? 1 : undefined,
    },
  }
}

// 1. Make sure the open action sits on top of its mega menu so the pseudo-
//    element looks like it belongs to the menu itself. This should be done only
//    when the menu is open on mobile, otherwise lower items overlap open menus.
// 2. Needed for the no-JS version where `<summary>` elements have a border.
// 3. Remove the small margin that Safari applies to all buttons.
const action = ({ isActive, isOpen }) => ({
  color: isActive ? 'var(--beige)' : 'inherit',
  display: 'inline-block',
  padding: 'var(--s-smaller) var(--s-base)',
  position: 'relative',
  textDecoration: 'none',
  zIndex: isOpen ? 20 : undefined, // 1
  borderBottom: 0, // 2
  margin: 0, // 3

  '::after': getInteractiveState({ isActive, isOpen }),

  medium: {
    zIndex: 20,
    padding: 'var(--s-base)',
  },
})

const skipLink = {
  border: 0,
  clip: 'rect(1px, 1px, 1px, 1px)',
  WebkitClipPath: 'inset(50%)',
  clipPath: 'inset(50%)',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  left: 0,
  width: '1px',
  whiteSpace: 'nowrap',

  ':focus': {
    width: 'auto',
    clip: 'auto',
    WebkitClipPath: 'none',
    clipPath: 'none',
    height: 'auto',
    overflow: 'visible',
    position: 'static',
    textDecoration: 'none',
    outlineStyle: 'auto',
  },
}

const icon = {
  fontSize: '80%',
  marginRight: 'var(--s-smallest)',
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
  skipLink,
  item,
  action,
  icon,
}

export default styles
