const ghost = {
  position: 'relative',

  '::before': {
    content: '"+"',
    opacity: 0,
    fontSize: '600%',
    left: '50%',
    top: '50%',
    width: '1.5em',
    height: '1.5em',
    position: 'absolute',
    color: '#ffffffb3',
    lineHeight: 1,
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 500ms',
  },

  ':hover::before': {
    opacity: 1,
  },
}

const button = {
  fontSize: '120%',
  display: 'block',
  opacity: 0.5,

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 2,
    cursor: 'pointer',
  },
}

const styles = { ghost, button }

export default styles
