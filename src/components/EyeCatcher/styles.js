const container = {
  position: 'relative',
  backgroundColor: 'var(--black)',
  textAlign: 'center',
  padding: '1em',
  marginBottom: 0,

  '::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '50%',
    height: '1px',
    transform: 'translateX(-50%)',
    backgroundImage:
      'linear-gradient(to right, transparent, hotpink, transparent)',
  },
}

const close = {
  color: 'var(--beige)',
  marginLeft: '1ch',
  fontSize: '80%',

  ':hover': {
    color: 'var(--white)',
  },
}

export default { container, close }
