const wrapper = ({ isActive }) => ({
  transition: '250ms',
  position: 'relative',
  transform: isActive ? 'scale(1.1)' : undefined,
  zIndex: isActive ? 2 : undefined,
})

const button = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
}

const styles = { wrapper, button }

export default styles
