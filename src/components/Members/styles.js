const list = {
  listStyleType: 'none',
  paddingLeft: 0,
  margin: '0 calc(var(--s-base) * -1)',
  display: 'flex',
  flexWrap: 'wrap',
}

const item = {
  flex: '0 1 50%',
  padding: 'var(--s-smaller) var(--s-base)',

  medium: { flexBasis: 'calc(100% / 3)' },
}

const styles = { list, item }

export default styles
