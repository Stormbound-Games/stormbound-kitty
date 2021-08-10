const item = ({ isPlaceholder }) => ({
  display: 'inline-block',
  width: 'calc(20% - 0.5em)',
  border: '1px solid var(--faction, rgba(255, 255, 255, 0.3))',
  margin: '0.07em 0.25em',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '0.2em',
  position: 'relative',
  padding: 0,
  borderStyle: isPlaceholder ? 'dashed' : undefined,
  borderColor: isPlaceholder ? 'rgba(255, 255, 255, 0.3)' : undefined,
  opacity: isPlaceholder ? 0.7 : undefined,

  "[style*='--neutral']": {
    backgroundColor: 'rgba(0, 0, 0, 0.33)',
  },

  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'var(--faction)',
    opacity: 1,
    zIndex: -1,
  },

  '::before': {
    content: '""',
    display: 'block',
    paddingTop: '100%',
  },

  medium: {
    width: '4.66em',
    height: '4.66em',
  },
})

const image = {
  maxWidth: '90%',
  maxHeight: '90%',
  objectFit: 'contain',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
  margin: 'auto',
}

const name = {
  position: 'absolute',
  opacity: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

export default {
  item,
  image,
  name,
}
