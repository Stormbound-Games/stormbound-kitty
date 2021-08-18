const BACKGROUNDS = {
  neutral: {
    unit: 'var(--neutral)',
    spell: '#898c95',
    structure: '#373f43',
    hero: '#191919',
  },
  ironclad: {
    unit: 'var(--ironclad)',
    spell: '#b36f78',
    structure: '#5b3332',
    hero: '#301b20',
  },
  shadowfen: {
    unit: 'var(--shadowfen)',
    spell: '#5b988f',
    structure: '#1c413c',
    hero: '#0b211d',
  },
  swarm: {
    unit: 'var(--swarm)',
    spell: '#9d7d5f',
    structure: '#3c2d1c',
    hero: '#221b04',
  },
  winter: {
    unit: 'var(--winter)',
    spell: '#515f80',
    structure: '#20283c',
    hero: '#09192a',
  },
}

/**
 * 1. When a deck is displayed on the desktop version, it is within a 1/3
 *    column. By setting the computed width in CSS directly, we can avoid a
 *    slight font-size decrease when JavaScript kicks in.
 */
const deck = ({ orientation }) => ({
  fontSize: 'var(--font-size)',

  ...(orientation === 'horizontal'
    ? {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 'var(--s-base)',
        marginTop: 'var(--s-small)',

        medium: {
          fontSize: 'var(--font-size, 13.8137px)' /* 1 */,
        },

        '::before': {
          content: '""',
          display: 'block',
          paddingTop: '50%',
        },
      }
    : {}),

  ...(orientation === 'vertical'
    ? {
        marginBottom: 'var(--s-large)',

        medium: {
          fontSize: 'var(--font-size, 13.4085px)' /* 1 */,
        },
      }
    : {}),
})

const list = ({ orientation }) => ({
  listStyleType: 'none',
  padding: 0,
  margin: 0,

  ...(orientation === 'horizontal'
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        bottom: 0,
      }
    : {}),

  ...(orientation === 'vertical'
    ? {
        marginLeft: '1em',
      }
    : {}),
})

const getSlotColor = ({ faction, isLegendary, type }) =>
  !faction
    ? BACKGROUNDS.neutral.unit
    : isLegendary
    ? BACKGROUNDS[faction].hero
    : BACKGROUNDS[faction][type]

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
  display: 'flex',
  alignItems: 'center',
  color: 'var(--white)',
  backgroundColor: getSlotColor({ faction, isLegendary, type }),
  border: '2px solid #ffffff33',
  borderRadius: '0.2em',
  position: 'relative',
  transition: '250ms',

  ...(isExcluded
    ? {
        opacity: isExcluded ? 0.6 : undefined,
      }
    : {}),

  ...(isMissing
    ? {
        opacity: 0.3,
        filter: 'grayscale(1) contrast(200%)',
      }
    : {}),

  ...(isEmpty
    ? {
        minHeight: '2.5em',
        backgroundColor: 'transparent',
        border: '2px dotted #ffffff80',
        opacity: 0.5,
      }
    : {}),

  ...(isUpgradable
    ? {
        borderColor: 'var(--upgradable)',
      }
    : {}),

  ...(orientation === 'horizontal'
    ? {
        margin: '0 0.15em',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        flex: '1 1 calc(100% / 12)',
      }
    : {}),

  ...(orientation === 'vertical'
    ? {
        padding: '0.25em 1em',
        margin: '0.25em 0',
      }
    : {}),
})

const mana = ({ isDecreased, isIncreased, orientation }) => ({
  ...(orientation === 'vertical'
    ? {
        transform: 'scale(1.2)',
        left: '-2em',
      }
    : {}),

  ...(orientation === 'horizontal'
    ? {
        fontSize: '80%',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '-0.7em',
      }
    : {}),

  ...(isDecreased
    ? {
        color: 'var(--affordable)',
      }
    : {}),

  ...(isIncreased
    ? {
        color: 'var(--light-ironclad)',
      }
    : {}),
})

const name = ({ orientation }) => ({
  textTransform: 'uppercase',

  ...(orientation === 'horizontal'
    ? {
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
      }
    : {}),
})

const image = ({ orientation }) => ({
  display: 'inline-block',

  ...(orientation === 'vertical'
    ? {
        maxWidth: '1.5em',
        maxHeight: '1.6em',
        marginTop: 0,
        marginBottom: 0,
        marginRight: '1em',
        marginLeft: 'auto',
        objectFit: 'contain',
      }
    : {}),

  ...(orientation === 'horizontal'
    ? {
        width: 'auto',
        maxWidth: '100%',
        maxHeight: '1.75em',
        margin: 'auto auto 0.25em',
      }
    : {}),
})

const button = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  transition: 'background-color 250ms',
  zIndex: 2,

  ':not(:disabled):hover': {
    backgroundColor: '#ffffff1a',
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
