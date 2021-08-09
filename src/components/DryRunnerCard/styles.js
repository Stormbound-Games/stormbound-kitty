const wrapper = ({ isActive }) => ({
  transition: '250ms',
  position: 'relative',
  transform: isActive ? 'scale(1.1)' : undefined,
  zIndex: isActive ? 2 : undefined,
})

const button = {
  backgroundColor: 'transparent',
  padding: 0,
  border: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
  cursor: 'pointer',
}

export default { wrapper, button }
