// 1. Flex context to inline cells in a row
// 2. Spacing between rows
// 3. Position context for front-line pseudo-elements
const row = ({ player, frontRowIndex = 0 }) => ({
  display: 'flex', // 1
  paddingBottom: '3px', // 2
  position: 'relative', // 3
  counterIncrement: 'row -1',
  transition: 'top 250ms ease-out, bottom 250ms ease-out',

  '::before': {
    content: Boolean(player) ? '""' : undefined,
    position: 'absolute',
    height: '1px',
    width: '100%',
    transition: 'inherit',
    backgroundColor:
      player === 'RED'
        ? 'var(--player-red)'
        : player === 'BLUE'
        ? 'var(--player-blue)'
        : undefined,
    top:
      player === 'RED'
        ? ['100%', '200%', '300%', '400%'][frontRowIndex]
        : undefined,
    bottom:
      player === 'BLUE'
        ? [undefined, '400%', '300%', '200%', '100%'][frontRowIndex]
        : undefined,
  },

  '::after': {
    content: Boolean(player) ? '""' : undefined,
    position: 'absolute',
    width: '0.4em',
    height: '0.4em',
    transform: 'rotate(45deg)',
    opacity: 0.8,
    transition: 'inherit',
    top:
      player === 'RED'
        ? ['100%', '200%', '300%', '400%'][frontRowIndex]
        : undefined,
    bottom:
      player === 'BLUE'
        ? [undefined, '400%', '300%', '200%', '100%'][frontRowIndex]
        : undefined,

    ...(player === 'BLUE'
      ? {
          left: 'calc(100% - 1px)',
          color: 'var(--player-blue)',
          borderTop: '1px solid',
          borderLeft: '1px solid',
          transformOrigin: 'bottom left',
        }
      : {}),

    ...(player === 'RED'
      ? {
          right: 'calc(100% - 1px)',
          color: 'var(--player-red)',
          borderBottom: '1px solid',
          borderRight: '1px solid',
          transformOrigin: 'top right',
        }
      : {}),
  },
})

const styles = { row }

export default styles
