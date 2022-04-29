const section = {
  marginLeft: 'calc(var(--s-large) * -1)',
  marginRight: 'calc(var(--s-large) * -1)',
  overflow: 'hidden',
  backgroundImage: 'linear-gradient(300deg, var(--color), transparent)',

  medium: {
    width: '100vw',
    position: 'relative',
    marginTop: 'var(--s-base)',
    marginBottom: 'var(--s-base)',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    left: '50%',
    right: '50%',

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
  },
}

const inner = {
  padding: 'var(--s-base) var(--s-large) 0',
  textAlign: 'center',

  medium: {
    width: '1200px',
    maxWidth: '100%',
    margin: '0 auto',
    textAlign: 'left',
    padding: 'var(--s-large)',
  },
}

const title = {
  fontSize: '180%',
  marginTop: 0,
  marginBottom: 'var(--s-smaller)',

  medium: {
    marginTop: 'var(--s-base)',
  },
}

const image = {
  medium: {
    marginLeft: 'auto',
    maxHeight: '15em',
    zIndex: 2,
    position: 'relative',
  },
}

// 1. Visually align the right button with the edge of the text.
const actions = {
  medium: {
    marginTop: 'var(--s-large)',
    marginLeft: 'calc(var(--s-smaller) * -1)', // 1
    marginBottom: 'var(--s-base)',
  },
}

const action = {
  margin: 'var(--s-smaller) var(--s-smallest)',
}

const styles = {
  section,
  inner,
  title,
  image,
  actions,
  action,
}

export default styles
