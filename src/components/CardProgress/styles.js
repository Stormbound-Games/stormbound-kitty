const progress = {
  position: 'relative',
}

const label = {
  textAlign: 'center',
  fontSize: '135%',
  display: 'block',
  marginTop: '0.5em',
}

const image = ({ isStone }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  transform: isStone
    ? 'translate(-50%, -35%) scale(0.9)'
    : 'translate(-50%, -25%)',
  zIndex: 2,
})

export default {
  progress,
  label,
  image,
}
