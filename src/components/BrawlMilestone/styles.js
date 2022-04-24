// 1. Arbitrary dimensions looking fine on both modile and desktop.
// 2. Usual reflection effect on the box.
const milestone = ({ isCollected }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '20em', // 1
  height: '20em', // 1
  backgroundImage: 'linear-gradient(45deg, #1c4352 50%, #1e4858 50%)', // 2
  border: '1px solid var(--dark-beige)',
  boxShadow: '0 0 0 5px ' + isCollected ? '#1c435280' : '#1c4352',
  margin: 'auto',
})

const header = {
  padding: 'var(--s-small)',
  fontSize: '120%',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#9fd4e7',
  backgroundColor: '#365c70',
}

// 1. Increase bottom spacing as the progress bar is absolutely positioned
//    at the bottom.
const body = {
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 'var(--s-base) var(--s-base) var(--s-large)', // 2
}

const overlay = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: '#00000080',
  zIndex: 2,
}

// 1. Negates the 1px border and 5px box-shadow on the top-level container.
const collected = {
  backgroundImage: 'linear-gradient(45deg, #d2c38d 50%, var(--beige) 50%)',
  position: 'absolute',
  left: '-6px', // 1
  right: '-6px', // 1
  padding: 'var(--s-smaller)',
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
  marginTop: 'var(--s-smaller)',
}

const asset = {
  width: '50%',
}

// 1. Reverse engineer the width from the ratio of a card.
const card = {
  width: 'calc(100% / 168.6 * 100)', // 1
  margin: 'auto',
}

// 1. Reverse engineer the width from the ratio of a book.
const bookImage = {
  width: 'calc(100% / 146.5 * 100)', // 1
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

const styles = {
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

export default styles
