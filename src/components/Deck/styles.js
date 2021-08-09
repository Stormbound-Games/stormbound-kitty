/**
 * 1. When a deck is displayed on the desktop version, it is within a 1/3
 *    column. By setting the computed width in CSS directly, we can avoid a
 *    slight font-size decrease when JavaScript kicks in.
 */
const deck = ({ orientation }) => ({
  fontSize: 'var(--font-size)',

  ...(orientation === 'horizontal' && {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1em',
    marginTop: '0.7em',

    medium: {
      fontSize: 'var(--font-size, 13.8137px)' /* 1 */,
    },

    '::before': {
      content: '""',
      display: 'block',
      paddingTop: '50%',
    },
  }),

  ...(orientation === 'vertical' && {
    marginBottom: '2em',

    medium: {
      fontSize: 'var(--font-size, 13.4085px)' /* 1 */,
    },
  }),
})

const list = ({ orientation }) => ({
  listStyleType: 'none',
  padding: 0,
  margin: 0,

  ...(orientation === 'horizontal' && {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    bottom: 0,
  }),

  ...(orientation === 'vertical' && {
    marginLeft: '1em',
  }),
})

const card = ({
  faction,
  isEmpty,
  isExcluded,
  isLegendary,
  isMissing,
  isUpgradable,
  orientation,
  type,
}) => ({
  color: 'var(--white)',
  backgroundColor: 'rgb(78, 86, 89)',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '0.2em',
  position: 'relative',
  transition: '250ms',

  ...(isExcluded && {
    opacity: isExcluded ? 0.6 : undefined,
  }),

  ...(isMissing && {
    opacity: 0.3,
    filter: 'grayscale(1) contrast(200%)',
  }),

  ...(isEmpty && {
    minHeight: '2.5em',
    backgroundColor: 'transparent',
    border: '2px dotted rgba(255, 255, 255, 0.3)',
    opacity: 0.5,
  }),

  ...(isUpgradable && {
    borderColor: 'var(--upgradable)',
  }),

  ...(orientation === 'horizontal' && {
    margin: '0 0.15em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    flex: '1 1 calc(100% / 12)',
  }),

  ...(orientation === 'vertical' && {
    padding: '0.25em 1em',
    display: 'flex',
    alignItems: 'center',
    margin: '0.25em 0',
  }),

  ...(type === 'spell' && {
    backgroundColor: 'rgb(137, 140, 149)',
  }),

  ...(type === 'structure' && {
    backgroundColor: 'rgb(55, 63, 67)',
  }),

  ...(isLegendary && {
    backgroundColor: 'rgb(25, 25, 25)',
  }),

  ...(faction === 'swarm' && {
    backgroundColor: isLegendary
      ? 'rgb(34, 27, 4)'
      : type === 'structure'
      ? 'rgb(60, 45, 28)'
      : type === 'spell'
      ? 'rgb(157, 125, 95)'
      : 'var(--swarm)',
  }),

  ...(faction === 'ironclad' && {
    backgroundColor: isLegendary
      ? 'rgb(48, 27, 32)'
      : type === 'structure'
      ? 'rgb(91, 51, 50)'
      : type === 'spell'
      ? 'rgb(179, 111, 120)'
      : 'var(--ironclad)',
  }),

  ...(faction === 'shadowfen' && {
    backgroundColor: isLegendary
      ? 'rgb(11, 33, 29)'
      : type === 'structure'
      ? 'rgb(28, 65, 60)'
      : type === 'spell'
      ? 'rgb(91, 152, 143)'
      : 'var(--shadowfen)',
  }),

  ...(faction === 'winter' && {
    backgroundColor: isLegendary
      ? 'rgb(9, 25, 42)'
      : type === 'structure'
      ? 'rgb(32, 40, 60)'
      : type === 'spell'
      ? 'rgb(81, 95, 128)'
      : 'var(--winter)',
  }),
})

const mana = ({ isDecreased, isIncreased, orientation }) => ({
  ...(orientation === 'vertical' && {
    transform: 'scale(1.2)',
    left: '-2em',
  }),

  ...(orientation === 'horizontal' && {
    fontSize: '80%',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '-0.7em',
  }),

  ...(isDecreased && {
    color: 'var(--affordable)',
  }),

  ...(isIncreased && {
    color: 'var(--light-ironclad)',
  }),
})

const name = ({ orientation }) => ({
  textTransform: 'uppercase',

  ...(orientation === 'horizontal' && {
    transformOrigin: 'top left',
    transform: 'rotate(90deg) translateY(-50%)',
    whiteSpace: 'nowrap',
    position: 'absolute',
    left: '50%',
    top: '1.5em',
    maxWidth: '500%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '85%',
  }),
})

const image = ({ orientation }) => ({
  display: 'inline-block',

  ...(orientation === 'vertical' && {
    maxWidth: '1.5em',
    maxHeight: '1.6em',
    marginTop: 0,
    marginBottom: 0,
    marginRight: '1em',
    marginLeft: 'auto',
    objectFit: 'contain',
  }),

  ...(orientation === 'horizontal' && {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '1.75em',
    margin: 'auto auto 0.25em',
  }),
})

const button = {
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
  transition: 'background-color 250ms',
  zIndex: 2,

  ':not(:disabled):hover': {
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}

export default {
  deck,
  list,
  card,
  mana,
  name,
  image,
  button,
}
