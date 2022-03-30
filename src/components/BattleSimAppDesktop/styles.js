/**
 * 1. Make sure embedded sims within editorial content have the expected font
 *    size, which was originally 90% of the root font size (hence `0.9rem`).
 */
const root = {
  position: 'relative',
  fontSize: '0.9rem' /* 1 */,
}

/**
 * 1. Hide the header from the teaser.
 */
const puzzle = {
  position: 'absolute',
  right: 0,
  top: 0,
  padding: 'var(--s-base)',
  width: 'calc((100% - 40%) / 2)',

  '> * > :first-child': { display: 'none' /* 1 */ },
  '> ::before': { content: 'none' /* 1 */ },
  '> ::after': { content: 'none' /* 1 */ },
}

const deck = {
  position: 'absolute',
  right: 0,
  top: 0,
  padding: 'var(--s-base)',
  width: '25%',
}

const styles = { root, puzzle, deck }

export default styles
