const label = ({ disabled }) => ({
  textTransform: 'uppercase',
  fontSize: '90%',
  color: 'var(--beige)',
  display: 'inline-block',
  marginBottom: 'var(--s-smallest)',
  opacity: disabled ? 0.5 : 1,
})

const styles = { label }

export default styles
