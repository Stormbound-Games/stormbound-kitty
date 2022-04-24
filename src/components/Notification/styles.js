// 1. Horizontal pseudo-element at the top and the bottom of the box to give it
//    these cutted-out corners like in the game.
const notificationPseudo = {
  content: '""', // 1
  position: 'absolute',
  left: '0.5em',
  height: '0.5em',
  right: '0.5em',
  border: 'inherit',
  backgroundColor: 'inherit',
}

const notification = {
  width: '100%',

  zIndex: 20,
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,

  textAlign: 'center',
  fontSize: '90%',

  borderTop: '1px solid var(--dark-beige)',
  padding: 'var(--s-base) var(--s-large)',
  margin: 0,

  backgroundColor: 'var(--black)',
  borderRadius: 0,
  boxShadow: '0 -0.2em 0 0.5em #00000033',

  medium: {
    width: 'calc(1200px - var(--s-large))',
    maxWidth: 'calc(100% - var(--s-base) * 2)',

    bottom: '1.5em',
    left: '50%',
    transform: 'translateX(-50%)',

    textAlign: 'left',
    fontSize: '125%',

    border: '1px solid var(--dark-beige)',
    boxShadow: '0 0 1em 0.5em #00000033',

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
  },
}

const icon = {
  position: 'relative',
  top: '1.5px',
  marginRight: 'var(--s-smaller)',
}

const styles = { notification, icon }

export default styles
