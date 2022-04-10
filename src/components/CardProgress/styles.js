const progress = {
  position: 'relative',
}

const label = {
  textAlign: 'center',
  display: 'block',
  marginTop: 'var(--s-smaller)',
}

const image = ({ isStone }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  margin: 0,
  transform: isStone
    ? 'translate(-50%, -35%) scale(0.9)'
    : 'translate(-50%, -25%)',
  zIndex: 2,
})

const styles = { progress, label, image }

export default styles
