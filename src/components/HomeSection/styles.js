const section = {
  marginLeft: '-1em',
  marginRight: '-1em',
  paddingLeft: '1em',
  paddingRight: '1em',
  overflow: 'hidden',
  backgroundImage: 'linear-gradient(60deg, var(--color), transparent)',

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
      transform: 'translate(-20%, -50%) rotate(45deg)',
      left: 0,
      top: '50%',
      WebkitMaskImage: 'linear-gradient(35deg, var(--black), transparent)',
      maskImage: 'linear-gradient(35deg, var(--black), transparent)',
      backgroundImage:
        'repeating-linear-gradient(80deg, var(--color), var(--color) 4px, transparent 4px, transparent 8px)',
    },
  },
}

const inner = {
  padding: '1em',
  textAlign: 'center',

  medium: {
    width: '1200px',
    maxWidth: '100%',
    margin: '0 auto',
    textAlign: 'right',
    padding: '2em',
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
    marginRight: 'auto',
    maxHeight: '15em',
    zIndex: 2,
    position: 'relative',
  },
}

const actions = {
  /**
   * 1. Visually align the right button with the edge of the text.
   */
  medium: {
    marginTop: 'var(--s-large)',
    marginRight: '-0.5em' /* 1 */,
    marginBottom: 'var(--s-base)',
  },
}

const action = {
  marginTop: 'var(--s-smallest)',
  marginBottom: 'var(--s-smallest)',

  medium: {
    width: 'auto',
    margin: '0 var(--s-smaller)',
  },
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
