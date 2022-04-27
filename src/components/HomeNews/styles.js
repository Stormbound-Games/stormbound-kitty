// 1. Arbitrary position for the news box.
const container = {
  medium: {
    position: 'absolute',
    right: 0,
    width: '40%',
    top: '12em', // 1
    zIndex: 9,
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

// 1. Horizontal pseudo-element at the top and the bottom of the box to make
//    give it these cutted-out corners like in the game.
const boxPseudo = {
  content: '""', // 1
  position: 'absolute',
  left: 'var(--s-smaller)',
  height: 'var(--s-smaller)',
  right: 'var(--s-smaller)',
  border: 'inherit',
  backgroundColor: 'inherit',
}

// 1. For the horizontal spacing, `--s-base` feels a little tight while
//   `--s-large` feels too wide, so we go in between.
// 2. Partially pull the news box on top of the image.
const box = {
  position: 'relative',
  backgroundImage: 'url("/assets/images/background.jpg")',
  backgroundRepeat: 'repeat',
  backgroundColor: 'var(--black)',
  border: '1px solid var(--beige)',
  padding: 'var(--s-base) 1.5rem', // 1
  boxShadow: '0 0 2em 1em #00000033',
  marginTop: '-2.5em', // 2

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

const news = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
}

// 1. Give some vertical spacing for the visual artifact between news. However,
//   `--s-base` feels a little tight while `--s-large` feels too wide, so we go
//    in between.
const item = {
  position: 'relative',
  padding: '1.5rem 0', // 1

  // 1. Prevent background color from leaking behind the padding, which is
  //    necessary to have that gap between the filling and the border.
  ':not(:last-child)::after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    width: '0.3em',
    height: '0.3em',
    border: '1px solid var(--beige)',
    backgroundColor: 'var(--beige)', // 1
    backgroundClip: 'content-box', // 1
    padding: '1px', // 1
  },
}

const styles = { container, image, title, box, news, item }

export default styles
