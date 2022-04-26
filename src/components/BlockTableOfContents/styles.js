const list = {
  counterReset: 'item',
  listStyle: 'none',
}

// 1. It should be 3 characters (e.g. `1. `) but the fullstop and the space have
//    a relatively low width, so this value is adjusted to align properly.
const nestedList = {
  marginTop: 'var(--s-small)',
  marginBottom: 'var(--s-small)',
  paddingLeft: '1.8ch' /* 1 */,
}

const item = {
  marginBottom: 'var(--s-smaller)',

  '::before': {
    content: 'counters(item, ".") ". "',
    counterIncrement: 'item',
  },
}

const styles = { list, nestedList, item }

export default styles
