const button = {
  backgroundColor: 'transparent',
  padding: 0,
  border: 0,
  fontSize: '7vw',
  width: '1.25em',
  height: '1.25em',
  lineHeight: '1em',
  color: 'var(--black)',
  textAlign: 'center',
  zIndex: 2,
  transform: 'scale(0.8)',
  cursor: 'pointer',

  '::before': {
    content: '""',
    zIndex: -1,
    width: '80%',
    height: '80%',
    top: '50%',
    left: '50%',
    position: 'absolute',
    backgroundColor: 'var(--beige)',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    boxShadow: '0 0 0 1px var(--black), 0 0 0 2px var(--beige)',
    transition: 'box-shadow 0.5s',
  },

  ':hover::before': {
    boxShadow:
      '0 0 0 1px var(--black), 0 0 0 2px var(--beige), 0 0 0 4px var(--black), 0 0 0 5px var(--beige)',
  },

  medium: {
    fontSize: '200%',
  },
}

export default { button }
