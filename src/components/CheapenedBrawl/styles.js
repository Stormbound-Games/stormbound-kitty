const controls = {
  display: 'flex',
}

const control = ({ isActive }) => ({
  '--color': isActive ? 'rgba(155, 142, 112, 0.2)' : 'rgba(155, 142, 112, 0.1)',
  backgroundColor: 'transparent',
  background:
    'repeating-linear-gradient(-45deg, var(--color), var(--color) 4px, transparent 4px, transparent 8px)',
  font: 'inherit',
  border: 0,
  borderBottom:
    '0.2em solid ' + isActive ? 'var(--beige)' : 'var(--dark-beige)',
  padding: '1em 0',
  cursor: 'pointer',
  color: isActive ? 'var(--beige)' : 'var(--dark-beige)',
  flex: '1 1 calc(100% / 3)',

  ':hover': { color: 'var(--beige)' },
  ':focus': { color: 'var(--beige)' },
})

export default { controls, control }
