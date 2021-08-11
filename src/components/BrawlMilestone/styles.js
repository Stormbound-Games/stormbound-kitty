/**
 * 1. Arbitrary dimensions looking fine on both modile and desktop.
 * 2. Usual reflection effect on the box.
 */
const milestone = ({ isCollected }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '20em' /* 1 */,
  height: '20em' /* 1 */,
  backgroundImage:
    'linear-gradient(45deg, rgb(28, 67, 82) 50%, rgb(30, 72, 88) 50%)' /* 2 */,
  border: '1px solid var(--dark-beige)',
  boxShadow: '0 0 0 5px rgb(28, 67, 82)',
  margin: 'auto',

  ...(isCollected && {
    boxShadow: '0 0 0 5px rgba(28, 67, 82, 0.5)',
  }),
})

const header = {
  padding: '0.75em',
  fontSize: '120%',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: 'rgb(159, 212, 231)',
  backgroundColor: 'rgb(54, 92, 112)',
}

/**
 * 1. Increase bottom spacing as the progress bar is absolutely positioned
 *    at the bottom.
 */
const body = {
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em 1em 2em' /* 2 */,
}

const overlay = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 2,
}

/**
 * 1. Negates the 1px border and 5px box-shadow on the top-level container.
 */
const collected = {
  backgroundImage:
    'linear-gradient(45deg, rgb(210, 195, 141) 50%, rgb(226, 215, 175) 50%)',
  position: 'absolute',
  left: '-6px' /* 1 */,
  right: '-6px' /* 1 */,
  padding: '0.5em',
  top: '50%',
  zIndex: 2,
  textAlign: 'center',
  textTransform: 'uppercase',
  fontSize: '150%',
  color: 'var(--black)',
  transform: 'translateY(-50%)',
}

const label = {
  textAlign: 'center',
  textTransform: 'uppercase',
  fontSize: '130%',
  marginTop: '0.5em',
}

const asset = {
  width: '50%',
}

/**
 * 1. Reverse engineer the width from the ratio of a card.
 */
const card = {
  width: 'calc(100% / 168.6 * 100)' /* 1 */,
  margin: 'auto',
}

/**
 * 1. Reverse engineer the width from the ratio of a book.
 */
const bookImage = {
  width: 'calc(100% / 146.5 * 100)' /* 1 */,
  margin: 'auto',
  display: 'block',
}

const resourceImage = {
  margin: 'auto',
  display: 'block',
}

const footer = {
  position: 'absolute',
  bottom: 0,
  transform: 'translate(-50%, 50%)',
  left: '50%',
  zIndex: 2,
}

export default {
  milestone,
  header,
  body,
  overlay,
  collected,
  label,
  asset,
  card,
  bookImage,
  resourceImage,
  footer,
}
