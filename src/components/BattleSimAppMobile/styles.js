const root = {
  position: 'relative',
  flex: '1 1 100%',
  transition: 'transform 0.25s ease-in-out',
  overflowX: 'hidden',
}

const panel = ({ type, isActive }) => ({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
  top: '0.5em',
  right: side === 'RIGHT' ? '0.5em' : undefined,
  left: side === 'LEFT' ? '0.5em' : undefined,
})

export default {
  root,
  panel,
  board,
  button,
}
