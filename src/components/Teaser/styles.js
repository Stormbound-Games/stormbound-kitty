// 1. Small pseudo-elements overlayed on top of the story header to give the box
//    these cutted-out corners like in the game.
// 2. Dimensions of these cutted-out corners aligned with the `left` and `right`
//    values of the `.Teaser__body` pseudo-element used at the bottom,
//    while taking into account the fact that they are placed at -1 offsets..
// 3. Offset matching the thickness of the border, so it can be placed on top.
const teaserPseudo = {
  content: '""', // 1
  width: 'calc(0.5em + 1px)', // 2
  height: 'calc(0.5em + 1px)', // 2
  top: '-1px', // 3
  position: 'absolute',
  borderBottom: 'inherit',
  zIndex: 2,
  backgroundColor: 'var(--black)',
}

// 1. Prevent teasers from being abnormally big when used in an editorial
//    container.
// 2. Make sure stories will all have the same height when displayed in columns.
// 3. Used to be able to spread the story body all the remaining height.
const teaser = ({ isLarge }) => ({
  position: 'relative',
  fontSize: '1rem', // 1
  border: '1px solid var(--dark-beige)',
  marginBottom: 'var(--s-large)',
  flexGrow: 1, // 2
  display: 'flex', // 3
  flexDirection: isLarge ? 'row' : 'column', // 3

  '::before': {
    ...teaserPseudo,
    left: '-1px',
    borderRight: 'inherit',
  },

  '::after': {
    ...teaserPseudo,
    right: '-1px',
    borderLeft: 'inherit',
  },
})

// 1. Position context for the pseudo-element used as a fixed ratio placeholder.
// 2. Make sure the `.Card` can safely overflow.
const header = ({ isLarge }) => ({
  position: 'relative', // 1
  overflow: 'hidden', // 2
  flex: isLarge ? '1 0 calc(100% / 3)' : undefined,
  borderRight: isLarge ? '1px solid var(--dark-beige)' : undefined,
  borderBottom: isLarge ? 0 : 'inherit',

  // 1. Pseudo-element used to apply a striped background to the header while
  //    being able to tweak its opacity.
  // 2. Make sure it covers the entire height of the header.
  // 3. Fix position quirks and make diagonal stripes.
  '::after': {
    content: '""', // 1
    zIndex: -1,
    position: 'absolute',
    paddingTop: '100%', // 2
    width: '100%', // 2
    transform: 'translate(-20%, -50%) rotate(45deg)', // 3
    left: 0,
    top: '50%',
    opacity: 0.5,
    transition: 'opacity 800ms',
    WebkitMaskImage: 'linear-gradient(35deg, var(--black), transparent)',
    maskImage: 'linear-gradient(35deg, var(--black), transparent)',
    backgroundImage:
      'repeating-linear-gradient(80deg, var(--color), var(--color) 4px, transparent 4px, transparent 8px)',
  },

  // 1. Pseudo-element used to apply a fixed ratio to the header, since all its
  //    content is absolutely positioned.
  // 2. Arbitrary ratio which comes relatively close to giving the teasers a
  //    golden ratio.
  '::before': {
    content: '""', // 1
    display: 'block',
    paddingBottom: 'calc(100% / 3 * 2)', // 2
  },

  // 1. When hovering the entire teaser, lighten up the background.
  ':hover::after': {
    opacity: 1, // 1
  },
})

const card = {
  position: 'absolute',
  width: '60%',
  top: '2%',
  right: 0,
  transform: 'rotate(-12deg)',
  transitionDuration: '2000ms',

  // 1. When hovering the entire teaser, slowly rotate the card to highlight it.
  ':hover': {
    transform: 'rotate(-7deg)', // 1
  },
}

// 1. Make sure the body takes the entire remaining height of the teaser.
const body = ({ isLarge }) => ({
  position: 'relative',
  padding: isLarge ? 'var(--s-large)' : 'var(--s-small)',
  backgroundColor: 'var(--black)',
  flexGrow: 1, // 1
  fontSize: isLarge ? '150%' : undefined,

  // 1. Horizontal pseudo-element at the bottom of the box to give it these
  //    cutted-out corners like in the game.
  '::after': {
    content: isLarge ? 'none' : '""', // 1
    position: 'absolute',
    left: '0.5em',
    height: '0.5em',
    right: '0.5em',
    border: '1px solid var(--dark-beige)',
    backgroundColor: 'inherit',
    top: '100%',
    borderTop: 0,
  },
})

const meta = {
  fontSize: '80%',
  color: 'var(--beige)',
  textTransform: 'uppercase',
  marginBottom: 0,

  '> a': { textDecoration: 'none' },
  '> a:hover': { color: 'var(--white)' },
}

const author = {
  textDecoration: 'none',

  ':hover': { color: 'var(--white)' },
}

const title = {
  marginTop: 0,
  marginBottom: 'var(--s-smaller)',
}

const link = {
  textDecoration: 'none',

  ':hover': { borderBottom: '1px solid' },
}

const excerpt = {
  marginBottom: 0,
}

const styles = {
  teaser,
  header,
  card,
  body,
  meta,
  author,
  title,
  link,
  excerpt,
}

export default styles
