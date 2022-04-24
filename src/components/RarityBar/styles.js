const bar = {
  height: '0.5em',
  display: 'flex',

  ':hover > * > *': { opacity: 1 },
}

// 1. `12` is the amount of cards in a deck.
const slice = {
  width: 'calc(100% / 12 * var(--count))', // 1
  backgroundColor: 'var(--color)',
  height: '100%',
  position: 'relative',

  ':first-child': {
    borderRadius: '0.25em 0 0 0.25em',
  },

  ':last-child': {
    borderRadius: '0 0.25em 0.25em 0',
  },
}

const count = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  transition: '200ms ease-out',
  backgroundColor: 'transparent',
  fontSize: '90%',
  opacity: 0,

  // 1. There is no elegant way to have a proper text stroke, so we have to place
  //    a pseudo-element behind the text itself, that repeats the same text with
  //    an actual stroke.
  '::before': {
    content: 'attr(title)', // 1
    position: 'absolute',
    left: 0,
    zIndex: -1,
    WebkitTextStroke: '2px var(--black)',
  },
}

const styles = { bar, slice, count }

export default styles
