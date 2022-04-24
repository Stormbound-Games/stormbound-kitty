// 1. Pull the meta content within the bottom spacing of the `HeaderBanner`
//    component.
const meta = {
  marginBottom: 'var(--s-larger)',
  textTransform: 'uppercase',
  color: 'var(--beige)',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  textAlign: 'center',

  medium: {
    display: 'flex',
    fontSize: '120%',
    justifyContent: 'space-between',
    marginTop: '-2em', // 1
    marginBottom: '5em',
  },
}

const action = {
  textDecoration: 'none',
  flex: '1 0 100%',
  marginTop: 'var(--s-smaller)',
  fontSize: '80%',
  textTransform: 'uppercase',

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  ':not(:disabled):hover': {
    textDecoration: 'underline',
  },

  medium: {
    marginLeft: 'auto',
    flex: '0 0 auto',
    marginTop: 0,
    fontSize: '100%',
  },
}

const actionIcon = {
  marginRight: '1ch',
  position: 'relative',
  top: '0.1em',

  ':last-child': {
    marginLeft: '1ch',
    marginRight: 0,
  },
}

const styles = { meta, action, actionIcon }

export default styles
