const pulse = {
  from: { boxShadow: '0 0 0 0 rgba(203, 43, 67, 0.6)' },

  '50%': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 0 0.5em transparent',
  },

  to: { boxShadow: '0 0 0 0 transparent' },
}

/**
 * 1. Make sure the header sits over the content.
 */
const header = {
  padding: '1em',
  zIndex: 10 /* 1 */,
}

const nav = ({ isSubNav }) => ({
  margin: '0 1em',
  borderBottom: isSubNav ? undefined : '1px solid var(--dark-beige)',

  small: {
    borderBottom: 0,
    position: 'relative',

    ':first-of-type::after': {
      content: '""',
      position: 'absolute',
      bottom: '-0.5em',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      height: '1px',
      background:
        'linear-gradient(to right, transparent, var(--dark-beige), transparent)',
    },
  },
})

const list = {
  listStyle: 'none',
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
const item = ({ isRight, isNew, isSelect }) => ({
  textAlign: isSelect ? 'left' : 'center',
  position: 'relative' /* 1 */,
  marginLeft: isRight ? 'auto' : undefined,
  width: isSelect ? '250px' : undefined,
  padding: isSelect ? '0.5em 1em' : undefined,
  overflow: isSelect ? 'visible' : undefined,

  '::after': isNew
    ? {
        content: '""',
        position: 'absolute',
        top: '0.75em',
        right: '0.5em',
        width: '0.5em',
        height: '0.5em',
        borderRadius: '50%',
        backgroundColor: 'rgba(203, 43, 67, 1)',
        animationName: pulse,
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-out',
      }
    : undefined,

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
const action = ({ isDisabled, isActive, isOpen, isWithinSubList }) => ({
  backgroundColor: 'transparent',
  border: 0,
  color: isActive ? 'var(--beige)' : 'inherit',
  display: 'inline-block',
  font: 'inherit',
  outline: 0,
  padding: '1em',
  position: 'relative',
  textDecoration: 'none',
  transition: 'color 250ms',
  opacity: isDisabled ? 0.5 : undefined,
  cursor: isDisabled ? 'help' : 'pointer',
  zIndex: isOpen ? 20 : undefined /* 1 */,

  small: {
    padding: isWithinSubList ? '0.5em 0' : '0 0 1em',
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
    transform: `translate(-50%, ${
      isWithinSubList ? '50%' : '-50%'
    }) rotate(45deg)`,
    top: isWithinSubList ? 'auto' : '100%',
    bottom: isWithinSubList ? '100%' : 'auto',
    left: '50%',
    border: '1px solid var(--dark-beige)',
    borderBottom: isWithinSubList ? undefined : 0,
    borderRight: isWithinSubList ? undefined : 0,
    borderTop: isWithinSubList ? 0 : undefined,
    borderLeft: isWithinSubList ? 0 : undefined,
    backgroundColor: 'var(--black)',
    opacity: isOpen ? 1 : 0,
    transition: 'opacity 250ms 150ms',
    backgroundImage: isWithinSubList
      ? 'linear-gradient(135deg, var(--black) 50%, var(--dark-beige) 50%)'
      : isActive &&
        !isOpen &&
        'linear-gradient(135deg, var(--dark-beige) 50%, var(--black) 50%)' /* 2 */,

    medium: { opacity: isActive ? 1 : undefined },
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

export default {
  header,
  nav,
  list,
  item,
  action,
  icon,
}
