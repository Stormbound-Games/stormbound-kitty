const cards = {
  display: 'flex',
  padding: '0 var(--s-smallest)',
  zIndex: 2,
}

const button = ({ isEmpty }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',

  '::after': {
    content: isEmpty ? '"+"' : undefined,
    opacity: 0,
    fontSize: '350%',
    left: '50%',
    top: '50%',
    position: 'absolute',
    color: '#ffffffb3',
    lineHeight: 1,
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 500ms',
  },

  ':hover::after': {
    opacity: isEmpty ? 1 : undefined,
  },
})

const slot = ({ isCycle }) => ({
  flex: '0 0 calc(25% - var(--s-smaller))',
  position: 'relative',
  margin: '0 var(--s-smallest)',
  transition: '250ms',
  opacity: isCycle ? 0.5 : undefined,

  ':hover': {
    transform: 'scale(1.1)',
    zIndex: 2,
    opacity: 1,
  },

  '::before': {
    content: '""',
    display: 'block',
    paddingTop: '170%',
  },
})

const slotContent = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  transition: '0.25s',
}

const cycleButton = {
  position: 'absolute',
  bottom: '100%',
  right: 0,
  marginBottom: 'var(--s-large)',
}

const styles = {
  cards,
  button,
  slot,
  slotContent,
  cycleButton,
}

export default styles
