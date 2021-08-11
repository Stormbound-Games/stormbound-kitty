const gallery = {
  display: 'block',
  marginLeft: '-0.5em',
  marginRight: '-0.5em',
}

const list = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
}

const item = {
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: 'calc(100% / var(--cards-per-row))',
  padding: '1.25em 0.5em',
  position: 'relative',
}

/**
 * 1. Simulate a reflection with a sharp split gradient.
 * 2. Same horizontal spacing as the gallery item’s padding (taking into account
 *    the 150% font-size).
 * 3. Arbitrary position to cover the ability.
 */
const inDeck = {
  backgroundImage:
    'linear-gradient(45deg, #d2c38d 50%, var(--beige) 50%)' /* 1 */,
  position: 'absolute',
  left: 'calc(0.5em * 100 / 150)' /* 2 */,
  right: 'calc(0.5em * 100 / 150)' /* 2 */,
  padding: '0.15em 0.5em',
  bottom: '20%' /* 3 */,
  zIndex: 2,
  textAlign: 'center',
  textTransform: 'uppercase',
  fontSize: '150%',
  color: 'var(--black)',
}

const button = ({ isInDeck }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: 0,
  border: 0,
  backgroundColor: 'transparent',
  width: '100%',
  height: '100%',
  zIndex: 2,
  cursor: 'pointer',

  ':hover + *': !isInDeck && {
    transform: 'scale(1.08)',
  },
})

const nav = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',

  medium: { justifyContent: 'space-between' },
}

const navButton = {
  width: 'calc(50% - 1em)',

  medium: { width: '150px' },
}

export default { gallery, list, item, inDeck, button, nav, navButton }
