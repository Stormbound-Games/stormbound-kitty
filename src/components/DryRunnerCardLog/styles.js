const title = {
  color: 'var(--beige)',
  fontSize: '80%',
  textTransform: 'uppercase',
  marginTop: '1.25em',
  marginBottom: '0.5em',
}

const container = {
  width: '100%',
  height: '60px',
  display: 'flex',
  backgroundColor: 'var(--black)',
  border: '1px solid var(--dark-beige)',
  borderRadius: '4px',
  marginBottom: '2em',
}

const row = {
  width: '100%',
  margin: 0,
}

const imageWrapper = {
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}

const image = ({ isTurn }) => ({
  display: 'block',
  height: 'auto',
  maxHeight: '80%',
  maxWidth: '100%',
  margin: 'auto',

  '::after': isTurn
    ? {
        content: '""',
        position: 'absolute',
        right: '-0.5em',
        height: '80%',
        top: '50%',
        width: '1px',
        transform: 'translateY(-50%)',
        background:
          'linear-gradient(to bottom, transparent, var(--dark-beige), transparent)',
      }
    : undefined,
})

export default {
  title,
  container,
  row,
  imageWrapper,
  image,
}
