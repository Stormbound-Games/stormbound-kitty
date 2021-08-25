const period = {
  border: 0,
  padding: 0,
  color: 'inherit',
  textTransform: 'inherit',
  textDecoration: 'underline',
  width: 'calc(var(--length) * var(--multiplier))',
}

const outcome = {
  marginTop: 0,
  paddingLeft: 'var(--s-base)',

  '> li': { margin: 'var(--s-smallest) 0' },
}

const styles = { period, outcome }

export default styles
