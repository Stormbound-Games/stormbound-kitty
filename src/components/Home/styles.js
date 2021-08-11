/**
 * 1. The home page is supposed to be catchy, so increase its font size so text
 *    is more prominent.
 */
const home = {
  fontSize: '130%' /* 1 */,
  margin: '0 auto',
  position: 'relative',
  width: '100%',
}

const news = {
  /**
   * 1. Arbitrary position for the news box.
   */
  medium: {
    position: 'absolute',
    left: 0,
    width: '40%',
    top: '12em' /* 1 */,
    zIndex: 2,
  },
}

/**
 * 1. The image has quite a lot of spacing at the top which is negated by a
 *    negative top margin to bring it closer to the header.
 */
const newsImage = {
  maxWidth: '100%',
  marginTop: '-2em' /* 1 */,

  medium: {
    position: 'absolute',
    bottom: '100%',
    zIndex: -1,
    left: '50%',
    transform: 'translate(-50%, 8%)',
  },
}

const newsTitle = {
  marginBottom: 0,
}

/**
 * 1. Horizontal pseudo-element at the top and the bottom of the box to make
 *    give it these cutted-out corners like in the game.
 */
const newsBoxPseudo = {
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
const newsBox = {
  position: 'relative',
  background: 'url("/assets/images/background.png") repeat var(--black)',
  border: '1px solid var(--beige)',
  padding: '1em',
  boxShadow: '0 0 2em 1em #00000033',
  marginTop: '-2.5em' /* 1 */,

  '::before': {
    ...newsBoxPseudo,
    bottom: '100%',
    borderBottom: 0,
  },

  '::after': {
    ...newsBoxPseudo,
    top: '100%',
    borderTop: 0,
  },
}

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
      '-webkit-mask-image': 'linear-gradient(35deg, var(--black), transparent)',
      maskImage: 'linear-gradient(35deg, var(--black), transparent)',
      background:
        'repeating-linear-gradient(80deg, var(--color), var(--color) 4px, transparent 4px, transparent 8px)',
    },
  },
}

const sectionInner = {
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

const sectionTitle = {
  fontSize: '180%',
  marginTop: 0,
  marginBottom: 'var(--s-smaller)',

  medium: {
    marginTop: 'var(--s-base)',
  },
}

const sectionImage = {
  medium: {
    marginRight: 'auto',
    maxHeight: '15em',
    zIndex: 2,
    position: 'relative',
  },
}

const buttons = {
  /**
   * 1. Visually align the right button with the edge of the text.
   */
  medium: {
    marginTop: 'var(--s-large)',
    marginRight: '-0.5em' /* 1 */,
    marginBottom: 'var(--s-base)',
  },
}

const button = {
  marginTop: 'var(--s-smallest)',
  marginBottom: 'var(--s-smallest)',

  medium: {
    width: 'auto',
    margin: '0 var(--s-smaller)',
  },
}

export default {
  home,
  news,
  newsImage,
  newsTitle,
  newsBox,
  section,
  sectionInner,
  sectionTitle,
  sectionImage,
  buttons,
  button,
}
