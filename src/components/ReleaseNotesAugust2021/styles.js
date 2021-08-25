const cards = {
  display: 'flex',
  flexWrap: 'wrap',

  medium: {
    flexWrap: 'nowrap',
  },
}

const card = {
  padding: 'var(--s-smaller)',
  display: 'inline-block',
  maxWidth: '100%',
  height: 'auto',
  flex: '0 1 auto',
  width: 'calc(100% / 3)',

  medium: {
    width: 'calc(100% / 9)',
  },
}

const styles = { cards, card }

export default styles
