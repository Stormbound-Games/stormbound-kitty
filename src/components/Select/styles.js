const label = {
  textTransform: 'uppercase',
  fontSize: '90%',
  color: 'var(--beige)',
  display: 'inline-block',
  marginBottom: 'var(--s-smallest)',
}

const select = {
  WebkitAppearance: 'none',
  appearance: 'none',
  font: 'inherit',
  width: '100%',
  padding: '0.65em',
  borderRadius: '0.3em',
  backgroundColor: 'transparent',
  border: '1px solid #ded7a480',
  color: 'var(--white)',

  ':disabled': { opacity: 0.5 },
}

const styles = { label, select }

export default styles
