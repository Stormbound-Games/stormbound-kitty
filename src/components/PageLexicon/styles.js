const lexicon = {
  display: 'flex',
  width: 'auto',
}

const column = {
  paddingLeft: 'var(--s-large)',
  backgroundClip: 'padding-box',

  small: { paddingLeft: 0 },
}

const title = {
  marginBottom: 0,
  color: 'var(--beige)',

  ':first-child': {
    marginTop: 0,
  },

  ':not(:first-child)': {
    marginTop: 'var(--s-large)',
  },
}

const terms = {
  listStyleType: 'none',
  paddingLeft: 0,
  marginTop: 0,
  marginBottom: 0,
}

const item = {
  margin: 'var(--s-smaller) 0',
}

const styles = {
  lexicon,
  column,
  title,
  terms,
  item,
}

export default styles
