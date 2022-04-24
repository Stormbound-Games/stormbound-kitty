// 1. Prevent the mana pool from being distorded when rendered in a flex
//    container.
const mana = ({ isDisabled }) => ({
  width: '2em',
  textAlign: 'center',
  position: 'relative',
  flex: '0 0 auto', // 1
  filter: isDisabled ? 'grayscale(1)' : undefined,

  // 1. Force a specific aspect ratio regardless of the actual width.
  '::before': {
    content: '""',
    paddingTop: '80%', // 1
    display: 'block',
  },
})

// 1. Absolute centering within its parent.
const image = {
  position: 'absolute', // 1
  top: '50%', // 1
  left: '50%', // 1
  transform: 'translate(-50%, -50%)', // 1
  maxWidth: '100%',
  display: 'block',
  margin: 0,
}

// 1. Absolute centering within its parent based on background.
const value = {
  fontSize: '110%',
  position: 'absolute', // 1
  top: '50%', // 1
  left: '50%', // 1
  transform: 'translate(-50%, -50%) translateY(-10%)', // 1
}

const styles = { mana, image, value }

export default styles
