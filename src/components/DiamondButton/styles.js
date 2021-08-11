const button = ({ isActive }) => ({
  display: 'block',
  color: isActive ? 'var(--black)' : 'var(--beige)',
  transition: '250ms',
  width: '1.75em',
  height: '1.75em',
  lineHeight: '1.75em',
  textAlign: 'center',
  backgroundColor: 'transparent',
  border: 0,
  padding: 0,
  position: 'relative',
  cursor: 'pointer',

  '::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '1px solid var(--beige)',
    transform: 'translate(-50%, -55%) rotate(45deg)',
    left: '50%',
    top: '50%',
    zIndex: -1,
    transition: 'inherit',
    backgroundColor: isActive ? 'var(--beige)' : undefined,
  },

  ':hover': { color: 'var(--black)' },
  ':hover::before': { backgroundColor: 'var(--beige)' },
})

export default { button }
