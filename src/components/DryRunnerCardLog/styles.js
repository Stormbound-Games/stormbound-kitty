const title = {
  color: 'var(--beige)',
  fontSize: '80%',
  textTransform: 'uppercase',
  marginTop: 'var(--s-base)',
  marginBottom: 'var(--s-smaller)',
}

const container = {
  width: '100%',
  height: '60px',
  display: 'flex',
  backgroundColor: 'var(--black)',
  border: '1px solid var(--dark-beige)',
  borderRadius: '4px',
  marginBottom: 'var(--s-large)',
}

const row = {
  display: 'flex',
  width: '100%',
}

const imageWrapper = ({ isTurn }) => ({
  position: 'relative',
  display: 'flex',
  flex: '0 0 calc(100% / 6)',

  '::after': {
    content: isTurn ? '""' : undefined,
    position: 'absolute',
    right: 0,
    height: '80%',
    top: '50%',
    width: '1px',
    transform: 'translateY(-50%)',
    backgroundImage:
      'linear-gradient(to bottom, transparent, var(--dark-beige), transparent)',
  },
})

const image = {
  margin: 'auto',
  objectFit: 'contain',
  aspectRatio: '1 / 1',
}

const styles = {
  title,
  container,
  row,
  imageWrapper,
  image,
}

export default styles
