/**
 * 1. Vertical align mana with content
 * 2. On mobile where it takes the full available width, scale the font size
 *    based on the viewport width
 */
const banner = {
  backgroundImage:
    'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
  padding: '0.3em 2.25em',
  display: 'flex' /* 1 */,
  alignItems: 'center' /* 1 */,
  minWidth: '200px',
  fontSize: '4vw' /* 2 */,
  justifyContent: 'flex-start',
  flexDirection: 'row',

  medium: {
    fontSize: '1em',
    flexDirection: 'row-reverse',
  },
}

const meta = {
  display: 'flex',
  flexDirection: 'column',
  margin: '0 0.75em',
  textTransform: 'uppercase',
}

const faction = {
  marginTop: '0.15em',
  fontSize: '70%',
  whiteSpace: 'nowrap',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',

  medium: {
    flexDirection: 'row-reverse',
  },
}

const factionIcon = {
  width: '1.25em',
  height: '1.25em',
  margin: '0 0.4em',
}

export default {
  banner,
  meta,
  faction,
  factionIcon,
}
