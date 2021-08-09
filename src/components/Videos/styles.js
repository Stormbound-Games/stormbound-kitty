const video = {
  marginBottom: '3em',
}

const title = {
  marginTop: 0,
  marginBottom: '0.25em',
}

const image = {
  margin: 'auto',
  height: 'auto',
  display: 'block',
  width: '100%',
  borderRadius: '50%',

  small: {
    maxWidth: '70%',
    marginBottom: '1em',
  },
}

const link = {
  display: 'inline-block',
  color: 'var(--beige)',
  textDecoration: 'none',
  borderBottom: '1px solid transparent',

  ':hover': {
    borderBottomColor: 'currentColor',
  },
}

const icon = {
  position: 'relative',
  top: '0.2em',
  marginRight: '1ch',
}

const column = {
  medium: { display: 'none' },

  '@media (min-width: 1200px)': { display: 'block' },
}

export default {
  video,
  title,
  image,
  link,
  icon,
  column,
}
