const lexicon = {
  display: 'flex',
  marginLeft: '-2em',
  width: 'auto',
}

const column = {
  paddingLeft: '2em',
  backgroundClip: 'padding-box',
}

const heading = {
  marginBottom: '2em',
}

const title = {
  marginBottom: 0,
  color: 'var(--beige)',

  ':first-child': {
    marginTop: 0,
  },

  ':not(:first-child)': {
    marginTop: '2em',
  },
}

const terms = {
  listStyleType: 'none',
  paddingLeft: 0,
  marginTop: 0,
  marginBottom: '1.5em',
}

const item = {
  margin: '0.5em 0',
}

export default {
  lexicon,
  column,
  heading,
  title,
  terms,
  item,
}
