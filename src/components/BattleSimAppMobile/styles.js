/**
 * 1. Make sure embedded sims within editorial content have the expected font
 *    size, which was originally 90% of the root font size (hence `0.9rem`).
 */
const root = {
  position: 'relative',
  flex: '1 1 100%',
  transition: 'transform 0.25s ease-in-out',
  overflowX: 'hidden',
  fontSize: '0.9rem' /* 1 */,
}

const panel = ({ type, isActive }) => ({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  backgroundColor: '#000000e6',
  position: 'fixed',
  top: 0,
  bottom: 0,
  transition: 'transform 0.25s ease-out',
  width: '100%',
  zIndex: 10,
  overflow: 'auto',
  right: type === 'SETTINGS' ? '100%' : undefined,
  left: type === 'CELL' ? '100%' : undefined,
  transform: !isActive
    ? undefined
    : type === 'SETTINGS'
    ? 'translateX(100%)'
    : type === 'CELL'
    ? 'translateX(-100%)'
    : undefined,
})

const board = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}

const button = ({ side }) => ({
  position: 'absolute',
  top: 'var(--s-base)',
  right: side === 'RIGHT' ? 'var(--s-base)' : undefined,
  left: side === 'LEFT' ? 'var(--s-base)' : undefined,
  zIndex: 2,
})

const styles = { root, panel, board, button }

export default styles
