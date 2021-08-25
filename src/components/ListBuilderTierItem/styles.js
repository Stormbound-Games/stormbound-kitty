const item = ({ isPlaceholder }) => ({
  display: 'inline-block',
  width: 'calc(20% - var(--s-smaller))',
  border: '1px solid var(--color)',
  margin: '0.07em var(--s-smallest)',
  backgroundColor: '#00000099',
  borderRadius: '0.2em',
  position: 'relative',
  padding: 0,
  borderStyle: isPlaceholder ? 'dashed' : undefined,
  borderColor: isPlaceholder ? '#ffffff4d' : undefined,
  opacity: isPlaceholder ? 0.7 : undefined,

  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'var(--faction)',
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

const styles = { item, image, name }

export default styles
