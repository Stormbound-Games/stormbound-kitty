const display = {
  marginBottom: '2em',
}

const card = ({ isIrrelevant }) => ({
  marginBottom: '2em',
  opacity: isIrrelevant ? 0.5 : undefined,
  filter: isIrrelevant ? 'grayscale(1)' : undefined,
})

const singleCard = {
  margin: '1em 1em 0',
}

const buttons = {
  marginTop: '2.5em',
}

export default {
  display,
  card,
  singleCard,
  buttons,
}
