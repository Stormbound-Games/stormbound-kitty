const nav = {
  margin: '0 1em',
}

const list = {
  listStyleType: 'none',
  padding: 0,
  margin: '1em 0',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',

  medium: {
    margin: 0,
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },
}

const item = {
  flex: '1 0 auto',
  textAlign: 'center',

  medium: {
    flex: '0 1 auto',
  },
}

const action = ({ isActive, isDisabled, isOpen }) => ({
  color: isActive ? 'var(--beige)' : 'inherit',
  display: 'inline-block',
  outline: 0,
  padding: '0.5em 0',
  position: 'relative',
  textDecoration: 'none',
  opacity: isDisabled ? 0.5 : undefined,
  cursor: isDisabled ? 'help' : 'pointer',

  ':focus': { color: 'var(--light-swarm)' },

  /**
   * 1. Pseudo-element used for the active state and for when the dropdown is
   *    open (with 2 different classes respectively).
   */
  '::after': {
    content: '""' /* 1 */,
    width: '1em',
    height: '1em',
    position: 'absolute',
    transform: 'translate(-50%, 50%) rotate(45deg)',
    bottom: '100%',
    left: '50%',
    opacity: isOpen ? 1 : 0,
    border: '1px solid var(--dark-beige)',
    borderTop: 0,
    borderLeft: 0,
    backgroundColor: 'var(--black)',
    transition: 'opacity 250ms 150ms',
    backgroundImage:
      'linear-gradient(135deg, var(--black) 50%, var(--dark-beige) 50%)',
  },

  medium: {
    padding: '1em',

    '::after': {
      opacity: isActive ? 1 : undefined,
    },
  },
})

const styles = { nav, list, item, action }

export default styles
