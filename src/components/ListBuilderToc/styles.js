const list = {
  marginTop: 0,
  marginBottom: 0,
  paddingLeft: '2.5em',
  listStyleType: 'none',
  counterReset: 'toc',
}

const itemPseudo = {
  position: 'absolute',
  right: 'calc(100% + 0.75em)',
  top: '50%',
  width: '1.4em',
  height: '1.4em',
}

const item = {
  position: 'relative',
  counterIncrement: 'toc',
  margin: 'var(--s-smaller) 0',
  textIndent: '0 !important',

  '::before': {
    ...itemPseudo,
    content: 'counter(toc)',
    color: 'var(--color)',
    transform: 'translateY(-50%)',
    textAlign: 'center',
  },

  '::after': {
    ...itemPseudo,
    content: '""',
    boxSizing: 'border-box',
    border: ' 1px solid var(--color)',
    transform: 'translateY(-50%) rotate(45deg)',
  },
}

export default { list, item }
