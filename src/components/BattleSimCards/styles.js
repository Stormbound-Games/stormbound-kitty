const cards = {
  display: 'flex',
  padding: '0 var(--s-smallest)',
  zIndex: 2,
}

const button = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',
}

const slot = {
  flex: '0 0 calc(25% - var(--s-smaller))',
  position: 'relative',
  margin: '0 var(--s-smallest)',
  transition: '250ms',

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
}

const slotContent = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  transition: '0.25s',
}

const styles = {
  cards,
  button,
  slot,
  slotContent,
}

export default styles
