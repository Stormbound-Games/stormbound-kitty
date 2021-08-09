const panel = {
  padding: '2.5em 1em',
  position: 'relative',
  flex: '1 1 auto,',
}

const boardButton = ({ side }) => ({
  position: 'absolute',
  top: '0.5em',
  right: side === 'left' ? '0.5em' : undefined,
  left: side === 'right' ? '0.5em' : undefined,
})

export default { panel, boardButton }
