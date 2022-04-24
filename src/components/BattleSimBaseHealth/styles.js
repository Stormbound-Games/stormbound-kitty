// 1. Horizontal centering
const container = {
  textAlign: 'center', // 1
}

// 1. Make sure width doesn’t jump when changing from 1 to 2 digits
const value = {
  display: 'inline-block', // 1
  minWidth: '2ch', // 1
  color: 'var(--black)',
  fontSize: '140%',
  opacity: 0.9,

  // 1. On mobile where it takes the full available width, scale the font size
  //    based on the viewport width
  small: {
    fontSize: '5.5vw', // 1
  },
}

const styles = { container, value }

export default styles
