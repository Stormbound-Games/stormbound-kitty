const root = {
  position: 'relative',
}

/**
 * 1. Hide the header from the teaser.
 */
const puzzle = {
  position: 'absolute',
  right: 0,
  bottom: '-1.5em',
  padding: '1em',
  width: 'calc((100% - 40%) / 2)',

  '> * > :first-child': { display: 'none' /* 1 */ },
  '> ::before': { content: 'none' /* 1 */ },
  '> ::after': { content: 'none' /* 1 */ },
}

const deck = {
  position: 'absolute',
  right: 0,
  top: 0,
  padding: '1em',
  width: '25%',
}

export default {
  root,
  puzzle,
  deck,
}
