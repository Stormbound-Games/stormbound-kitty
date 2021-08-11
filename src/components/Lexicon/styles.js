const lexicon = {
  display: 'flex',
  marginLeft: '-2em',
  width: 'auto',
}

const column = {
  paddingLeft: '2em',
  backgroundClip: 'padding-box',
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

export default {
  lexicon,
  column,
  title,
  terms,
  item,
}
