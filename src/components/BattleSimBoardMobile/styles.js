/**
 * 1. Position context for actual grid
 * 2. Explicitly no Webp background here as the Webp version is way heavier than
 *    the original PNG.
 */
const board = {
  position: 'relative' /* 1 */,
  backgroundImage: "url('/assets/images/bg-swarm.png')" /* 1 */,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.2)',

  /**
   * 1. Ensure proper ratio based on background size
   */
  '::before': {
    content: '""' /* 1 */,
    display: 'block' /* 1 */,
    paddingTop: '200%' /* 1 */,
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

/*
@TODO: fix
.webp:not(.avif) .BattleSimBoardMobile {
  background-image: url('/assets/images/bg-swarm.webp'),
}
.avif .BattleSimBoardMobile {
  background-image: url('/assets/images/bg-swarm.avif'),
}
*/

/**
 * 1. Absolute positioning based on background
 */
const health = ({ player }) => ({
  position: 'absolute',
  left: '50%',
  top: player === 'RED' ? '8%' : '70%' /* 1 */,
  transform:
    player === 'RED'
      ? 'translateX(-50%) translateX(15%)'
      : 'translate(-50%) translateX(-30%)',
})

/**
 * 1. Absolute positioning based on background
 */
const player = ({ player }) => ({
  width: '65%',
  position: 'absolute',
  left: '-1.75em',
  top: player === 'RED' ? '8%' : '70%' /* 1 */,
})

/**
 * 1. Horizontal centering
 * 2. Hard-coded values based on background
 */
const grid = {
  position: 'absolute' /* 1 */,
  left: '50%' /* 1 */,
  transform: 'translateX(-50%)' /* 1 */,
  width: '73.75%' /* 2 */,
  top: '24%' /* 2 */,
}

const cards = {
  position: 'absolute',
  bottom: '1em',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: '100%',
}

export default {
  board,
  health,
  player,
  grid,
  cards,
}
