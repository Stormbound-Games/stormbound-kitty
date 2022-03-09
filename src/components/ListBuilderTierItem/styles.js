const item = ({ isEditable }) => ({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid var(--dark-beige)',
  borderRadius: '0.2em',
  padding: 'var(--s-smaller)',
  margin: 'var(--s-smaller) 0',
  backgroundImage: `linear-gradient(to right, var(--color), transparent)`,
  cursor: isEditable ? 'grab' : undefined,
  position: 'relative',
  overflow: 'hidden',

  '::after': {
    content: '""',
    position: 'absolute',
    paddingTop: '50%',
    width: '50%',
    transform: 'translate(20%, -50%) rotate(45deg)',
    right: 0,
    top: '50%',
    WebkitMaskImage: 'linear-gradient(270deg, var(--black), transparent)',
    maskImage: 'linear-gradient(270deg, var(--black), transparent)',
    backgroundImage:
      'repeating-linear-gradient(10deg, var(--color), var(--color) 4px, transparent 4px, transparent 8px)',
  },
})

const image = {
  maxWidth: '3em',
  marginLeft: '0 var(--s-small)',
}

const content = {
  marginLeft: 'var(--s-base)',
  marginRight: 'var(--s-base)',
  marginBottom: 0,
}

const name = { display: 'block' }

const meta = {
  opacity: 0.7,
}

const button = {
  zIndex: 2,
  marginLeft: 'auto',
  flexShrink: 0,
  marginRight: 'var(--s-smaller)',
}

const styles = { item, image, content, name, meta, button }

export default styles
