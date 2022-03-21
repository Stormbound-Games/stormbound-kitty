const dialog = {
  width: '850px',
}

const body = {
  medium: { padding: 'var(--s-large)' },
}

const inputWrapper = {
  position: 'relative',
}

const inputLoaderContainer = {
  margin: 0,
  position: 'absolute',
  top: '50%',
  right: '0.5em',
  transform: 'translateY(-50%)',
}

const inputLoader = {
  transform: 'none',
  margin: 0,
  width: '2em',
}

const list = {
  position: 'relative',
  listStyleType: 'none',
  padding: 0,
  margin: 'var(--s-base) calc(var(--s-large) * -1)',
  display: 'flex',
  flexWrap: 'wrap',

  medium: {
    '::before': {
      content: '""',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1px',
      height: '100%',
      background:
        'linear-gradient(to bottom, transparent, var(--dark-beige), transparent)',
    },
  },
}

const item = {
  flex: '1 1 100%',
  padding: 'var(--s-small) var(--s-large)',
  textAlign: 'left',

  medium: {
    flex: '1 1 50%',
  },
}

const icon = {
  position: 'relative',
  top: '0.225em',
  fontSize: '200%',
  opacity: 0.5,
  color: 'var(--beige)',
}

const meta = {
  display: 'block',
  opacity: 0.8,
  fontSize: '90%',
}

const arrow = {
  fontSize: '80%',
  transform: 'translateY(1px)',
  margin: '0 0.5ch',
}

const hint = {
  fontSize: '90%',
  marginBottom: 0,

  medium: {
    marginTop: 'var(--s-large)',
  },
}

const styles = {
  dialog,
  body,
  inputWrapper,
  inputLoaderContainer,
  inputLoader,
  list,
  item,
  icon,
  meta,
  arrow,
  hint,
}

export default styles
