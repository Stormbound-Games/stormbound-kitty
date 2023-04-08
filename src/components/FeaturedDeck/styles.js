const deck = {
  position: 'relative',
}

const info = {
  display: 'flex',
}

const meta = {
  paddingRight: 'var(--s-base)',
}

const name = {
  fontSize: '120%',
  display: 'block',
}

// 1. Pull rarity bar within the bottom margin of the deck itself.
const rarityBar = {
  marginBottom: 'var(--s-smaller)',
  marginTop: 'calc(var(--s-smaller) * -1)', // 1
}

const actions = {
  fontSize: '80%',
  display: 'flex',
  gap: 'var(--s-base)',
  marginTop: 'var(--s-base)',
  marginLeft: 'auto',
  marginRight: 'var(--s-smaller)',
  opacity: 0.5,
  transition: '250ms',

  ':hover': {
    opacity: 1,
  },
}

const styles = {
  deck,
  info,
  meta,
  name,
  rarityBar,
  actions,
}

export default styles
