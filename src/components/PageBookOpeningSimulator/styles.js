const list = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
}

const item = {
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: 'calc(100% / var(--cards-per-row))',
  padding: 'var(--s-base) var(--s-smaller)',
  position: 'relative',
}

const styles = { list, item }

export default styles
