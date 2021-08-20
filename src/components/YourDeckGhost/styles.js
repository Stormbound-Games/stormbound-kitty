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
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: 2,
  border: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  display: 'block',
}

const name = {
  fontSize: '120%',
  display: 'block',
  opacity: 0.5,
}

const styles = { ghost, button, name }

export default styles
