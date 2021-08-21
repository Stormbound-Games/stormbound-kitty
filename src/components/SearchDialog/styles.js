const arrow = {
  fontSize: '80%',
  transform: 'translateY(1px)',
  margin: '0 0.75ch',
}

const meta = {
  display: 'block',
  opacity: 0.8,
}

const wrapper = {
  textAlign: 'left',
  position: 'relative',
  flex: '1 1 auto',
  marginRight: '1em',
}

const inputWwrapper = {
  display: 'inline-block',
  width: '100%',
}

const list = ({ isOpen }) => ({
  listStyleType: 'none',
  padding: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 10,
  border: '1px solid' + isOpen ? 'var(--dark-beige)' : 'transparent',
  backgroundColor: 'var(--dark-blue)',
  borderRadius: '4px',
  top: 'calc(100% - 0.5em)',
  boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
})

const item = ({ isHighlighted, isSelected }) => ({
  padding: '0.5em',
  backgroundColor: isHighlighted ? '#0000001a' : 'transparent',
  fontWeight: isSelected ? 'bold' : 'normal',
})

const body = {
  fontSize: '120%',
  display: 'flex',
  alignItems: 'center',
  marginBottom: 'var(--s-base)',
}

const styles = {
  arrow,
  meta,
  wrapper,
  inputWwrapper,
  list,
  item,
  body,
}

export default styles
