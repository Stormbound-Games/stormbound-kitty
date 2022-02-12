const period = {
  border: 0,
  padding: 0,
  color: 'inherit',
  fontWeight: 'bold',
  textTransform: 'inherit',
  textDecoration: 'underline',
  width: 'calc(var(--length) * var(--multiplier))',

  '> option': { fontWeight: 'normal' },
}

const title = {
  fontSize: '140%',
  marginTop: 'var(--s-base)',
  marginBottom: 'var(--s-small)',
}

const outcome = {
  marginTop: 0,
  paddingLeft: 'var(--s-base)',

  '> li': { margin: 'var(--s-smallest) 0' },
}

const styles = { period, outcome, title }

export default styles
