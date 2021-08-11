const title = {
  marginTop: 0,
  marginBottom: 'var(--s-smallest)',
}

const image = {
  margin: 'auto',
  height: 'auto',
  display: 'block',
  width: '100%',
  borderRadius: '50%',

  small: {
    maxWidth: '70%',
    marginBottom: 'var(--s-base)',
  },
}

const link = {
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
  title,
  image,
  link,
  icon,
  column,
}
