/**
 * 1. Arbitrary position for the news box.
 */
const container = {
  medium: {
    position: 'absolute',
    left: 0,
    width: '40%',
    top: '12em' /* 1 */,
    zIndex: 2,
  },
}

const image = {
  width: 'max-content',
  maxWidth: '100%',

  medium: {
    position: 'absolute',
    bottom: '100%',
    zIndex: -1,
    left: '50%',
    transform: 'translate(-50%, 11%)',
  },
}

const title = {
  marginBottom: 0,
}

/**
 * 1. Horizontal pseudo-element at the top and the bottom of the box to make
 *    give it these cutted-out corners like in the game.
 */
const boxPseudo = {
  content: '""' /* 1 */,
  position: 'absolute',
  left: '0.5em',
  height: '0.5em',
  right: '0.5em',
  border: 'inherit',
  backgroundColor: 'inherit',
}

/**
 * 1. Partially pull the news box on top of the image.
 */
const box = {
  position: 'relative',
  backgroundImage: 'url("/assets/images/background.png")',
  backgroundRepeat: 'repeat',
  backgroundColor: 'var(--black)',
  border: '1px solid var(--beige)',
  padding: '1em 1.5em',
  boxShadow: '0 0 2em 1em #00000033',
  marginTop: '-2.5em' /* 1 */,

  '::before': {
    ...boxPseudo,
    bottom: '100%',
    borderBottom: 0,
  },

  '::after': {
    ...boxPseudo,
    top: '100%',
    borderTop: 0,
  },
}

const styles = { container, image, title, box }

export default styles
