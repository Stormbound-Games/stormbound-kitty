const banner = {
  position: 'relative',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',

  '::before': {
    content: '""',
    display: 'block',
    paddingTop: 'var(--ratio, 20%)',

    small: {
      paddingTop: '30%',
    },
  },

  '::after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    right: 0,
    height: '1px',
    backgroundImage: 'linear-gradient(to left, var(--beige), transparent)',
    width: '100%',
    zIndex: -1,

    small: {
      backgroundImage:
        'linear-gradient(to left, transparent, var(--beige), transparent)',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
}

const title = {
  fontSize: '500%',
  position: 'absolute',
  bottom: 0,
  margin: 0,
  width: '100%',
  lineHeight: 1,
  transform: 'translateY(30%)',
  paddingLeft: '30px',
  WebkitTextStroke: '1px var(--black)',
  letterSpacing: '-1px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  small: {
    fontSize: '225%',
    left: '50%',
    transform: 'translate(-50%, 30%)',
    paddingLeft: 0,
  },
}

export default { banner, title }
