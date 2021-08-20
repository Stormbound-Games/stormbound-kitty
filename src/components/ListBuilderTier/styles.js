const body = ({ isDragging }) => ({
  overflow: 'hidden',
  position: 'relative',
  margin: '0 -0.25em',
  cursor: isDragging ? 'move' : undefined,

  '::after': {
    position: 'absolute',
    paddingTop: '50%',
    width: '50%',
    opacity: 0.5,
    transform: 'translate(-27.5%, -50%) rotate(45deg)',
    left: 0,
    top: '50%',
    WebkitMaskImage: 'linear-gradient(35deg, var(--black), transparent)',
    maskImage: 'linear-gradient(35deg, var(--black), transparent)',
    backgroundImage:
      'repeating-linear-gradient(80deg, var(--color), var(--color) 4px, transparent 4px, transparent 8px)',
    zIndex: -1,

    medium: { content: '""' },
  },

  medium: {
    margin: '1em 0',
    padding: '1em',
  },
})

const empty = {
  color: 'var(--beige)',
  margin: 0,
}

const styles = { body, empty }

export default styles
