const button = ({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: isActive ? 'var(--black)' : 'var(--beige)',
  transition: '250ms',
  width: '1.75em',
  height: '1.75em',
  textAlign: 'center',
  backgroundColor: 'transparent',
  border: 0,
  padding: 0,
  position: 'relative',
  cursor: 'pointer',
  outline: 0,

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    filter: 'grayscale(1)',
  },

  '::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '1px solid var(--black)',
    boxShadow: '0 0 0 1px var(--beige)',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    left: '50%',
    top: '50%',
    zIndex: -1,
    transition: 'inherit',
    backgroundColor: isActive ? 'var(--beige)' : undefined,
  },

  ':not(:disabled):hover::before': {
    boxShadow:
      '0 0 0 1px var(--beige), 0 0 0 3px var(--black), 0 0 0 4px var(--beige)',
  },

  // 1. Define the default browser outline on the diamond itself so it looks
  //    like it can be focused.
  ':focus::before': {
    outline: ['auto 2px Highlight', 'auto 5px -webkit-focus-ring-color'], // 1
  },
})

const styles = { button }

export default styles
