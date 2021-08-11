const cards = {
  display: 'flex',
  flexWrap: 'wrap',

  medium: {
    flexWrap: 'nowrap',
  },
}

const card = {
  padding: '0.5em',
  display: 'inline-block',
  maxWidth: '100%',
  height: 'auto',
  flex: '0 1 auto',
  width: 'calc(100% / 3)',

  medium: {
    width: 'calc(100% / 9)',
  },
}

export default { cards, card }
