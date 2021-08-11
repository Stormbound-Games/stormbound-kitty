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
  lineHeight: 1,
  transform: 'translateY(30%)',
  marginLeft: '30px',
  '-webkit-text-stroke': '1px var(--black)',
  letterSpacing: '-1px',

  small: {
    fontSize: '225%',
    left: '50%',
    transform: 'translate(-50%, 30%)',
    marginLeft: 0,
    whiteSpace: 'nowrap',
  },
}

export default { banner, title }
