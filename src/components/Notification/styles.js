/**
 * 1. Horizontal pseudo-element at the top and the bottom of the box to give it
 *    these cutted-out corners like in the game.
 */
const notificationPseudo = {
  content: '""' /* 1 */,
  position: 'absolute',
  left: '0.5em',
  height: '0.5em',
  right: '0.5em',
  border: 'inherit',
  backgroundColor: 'inherit',
}

/**
 * 1. Arbitrary width for the notifications on desktop.
 */
const notification = {
  width: '18em' /* 1 */,
  position: 'fixed',
  backgroundColor: 'var(--black)',
  border: '1px double var(--beige)',
  right: '1.5em',
  bottom: '1.5em',
  padding: '1em',
  boxShadow: '0 0 0.25em 0.5em #0000001a',
  margin: 0,
  zIndex: 20,

  '::before': {
    ...notificationPseudo,
    bottom: '100%',
    borderBottom: 0,
  },

  '::after': {
    ...notificationPseudo,
    top: '100%',
    borderTop: 0,
  },

  small: {
    bottom: 0,
    left: 0,
    right: 0,
    border: 0,
    borderTop: '1px solid var(--beige)',
    width: '100%',
    fontSize: '90%',
    borderRadius: 0,
    boxShadow: '0 -0.2em 0 0.25em #0000001a',

    '::after': { content: 'none' },
    '::before': { content: 'none' },
  },
}

const icon = {
  position: 'relative',
  top: '1.5px',
}

const styles = { notification, icon }

export default styles
