const panel = {
  padding: '2.5em 1em',
  position: 'relative',
  flex: '1 1 auto,',
}

const boardButton = ({ side }) => ({
  position: 'absolute',
  top: 'var(--s-large)',
  right: side === 'left' ? 'var(--s-large)' : undefined,
  left: side === 'right' ? 'var(--s-large)' : undefined,
})

export default { panel, boardButton }
