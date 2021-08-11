const puzzle = {
  display: 'flex',
  fontSize: '125%',
}

const imageWrapper = {
  flex: '0 0 25%',
  marginRight: '1em',
}

const image = {
  width: '100%',
}

const content = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}

const name = {
  fontSize: '150%',
  display: 'block',
  marginBottom: 0,
  marginTop: 0,
}

const author = {
  margin: 0,
}

const term = {
  color: 'var(--beige)',
  display: 'inline',
  textTransform: 'capitalize',
  marginRight: '1ch',
}

const definition = {
  margin: 0,
  display: 'inline',

  '::after': {
    content: '""',
    display: 'block',
    width: '100%',
  },
}

const restriction = {
  borderBottom: '1px dotted',
  cursor: 'help',
}

export default {
  puzzle,
  imageWrapper,
  image,
  content,
  name,
  author,
  term,
  definition,
  restriction,
}
