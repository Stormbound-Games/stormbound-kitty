// 1. Position context for actual grid
const root = {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'relative', // 1
  overflow: 'hidden',
  width: '100%',
  border: '1px solid #ffffff33',

  // 1. Ensure proper ratio based on background size
  '::before': {
    content: '""', // 1
    display: 'block', // 1
    paddingTop: '62.5%', // 1
  },
}

const health = ({ type }) => ({
  position: 'absolute',
  left: '50%',
  top:
    type === 'RED'
      ? 'var(--red-health-y)'
      : type === 'BLUE'
      ? 'var(--blue-health-y)'
      : undefined,
  transform:
    type === 'RED'
      ? 'translateX(var(--red-health-x, -50%))'
      : type === 'BLUE'
      ? 'translateX(var(--blue-health-x, -50%))'
      : 'translateX(-50%)',
})

const player = ({ type }) => ({
  position: 'absolute',
  left: '10%',
  textAlign: 'right',
  top: type === 'RED' ? '8%' : type === 'BLUE' ? '79%' : undefined,
})

// 1. Horizontal centering
// 2. Hard-coded values based on background
const grid = {
  position: 'absolute', // 1
  left: '50%', // 1
  transform: 'translateX(-50%)', // 1
  width: '23%', // 2
  top: '24%', // 2
}

const cards = {
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 20%)',
  width: '40%',
}

const styles = {
  root,
  health,
  player,
  grid,
  cards,
}

export default styles
