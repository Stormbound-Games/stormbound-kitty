/**
 * 1. Align horizontal spacing with top-level navigation.
 */
const nav = {
  margin: '0 1em' /* 1 */,
}

const list = {
  listStyleType: 'none',
  paddingLeft: 0,
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',

  medium: {
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },
}

const item = {
  flex: '1 1 auto',
  textAlign: 'center',

  medium: {
    flexGrow: 0,
  },
}

/**
 * 1. Pseudo-element used for the active state and for when the dropdown is
 *    open.
 */
const getInteractiveState = ({ isActive, isOpen }) => ({
  content: '""' /* 1 */,
  width: '1em',
  height: '1em',
  position: 'absolute',
  transform: 'translate(-50%, 50%) rotate(45deg)',
  bottom: '100%',
  left: '50%',
  opacity: isActive ? 1 : isOpen ? 1 : 0,
  border: '1px solid var(--dark-beige)',
  borderTop: 0,
  borderLeft: 0,
  backgroundColor: 'var(--black)',
  transition: 'opacity 250ms 150ms',
  backgroundImage:
    'linear-gradient(135deg, var(--black) 50%, var(--dark-beige) 50%)',
})

const action = ({ isActive, isDisabled, isOpen }) => ({
  color: isActive ? 'var(--beige)' : 'inherit',
  display: 'inline-block',
  outline: 0,
  padding: '1em',
  position: 'relative',
  textDecoration: 'none',
  opacity: isDisabled ? 0.5 : undefined,
  cursor: isDisabled ? 'help' : 'pointer',

  ':focus': { color: 'var(--light-swarm)' },

  '::after': getInteractiveState({ isActive, isOpen }),
})

const component = {
  padding: '1em',
  textAlign: 'left',
  minWidth: '250px',

  medium: {
    padding: '0.5em 1em',
  },
}

const styles = { nav, list, item, action, component }

export default styles
