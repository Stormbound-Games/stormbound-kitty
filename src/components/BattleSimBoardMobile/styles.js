// 1. Position context for actual grid
const board = {
  position: 'relative', // 1
  overflow: 'hidden',
  border: '1px solid #ffffff33',

  // 1. Ensure proper ratio based on background size
  '::before': {
    content: '""', // 1
    display: 'block', // 1
    paddingTop: '200%', // 1
  },

  '@media (min-width: 700px) and (max-width: 799px)': {
    width: '325px',
  },

  '@media (min-width: 900px) and (max-width: 999px)': {
    width: '375px',
  },

  '@media (min-width: 1000px)': {
    width: '400px',
  },
}

// 1. Absolute positioning based on background
const health = ({ player }) => ({
  position: 'absolute',
  left: '50%',
  top: player === 'RED' ? '8%' : '70%', // 1
  transform:
    player === 'RED'
      ? 'translateX(-50%) translateX(15%)'
      : 'translate(-50%) translateX(-30%)',
})

// 1. Absolute positioning based on background
const player = ({ player }) => ({
  width: '65%',
  position: 'absolute',
  left: '-1.75em',
  top: player === 'RED' ? '8%' : '70%', // 1
})

// 1. Horizontal centering
// 2. Hard-coded values based on background
const grid = {
  position: 'absolute', // 1
  left: '50%', // 1
  transform: 'translateX(-50%)', // 1
  width: '73.75%', // 2
  top: '24%', // 2
}

const cards = {
  position: 'absolute',
  bottom: '1em',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: '100%',
}

const styles = {
  board,
  health,
  player,
  grid,
  cards,
}

export default styles
