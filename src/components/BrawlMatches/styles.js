const matches = {
  position: 'relative',
}

const table = {
  width: '100%',

  '> * > tr > *:first-child': {
    medium: { width: '60px' },
  },

  // 1. The first table cell of each row contains the match number, and should be
  //    colored differently like in the game.
  '> tbody > tr > td:first-of-type': {
    color: 'var(--beige)', // 1
  },
}

const edit = {
  marginLeft: 'var(--s-base)',
  left: '100%',
  top: '50%',
  cursor: 'pointer',
  zIndex: 2,

  ':hover': {
    color: 'var(--dark-beige)',
  },

  medium: {
    position: 'absolute',
    transform: 'translateY(-50%)',
    marginLeft: 0,
  },
}

const milestone = ({ isActive }) => ({
  '> td::after': {
    position: 'absolute',
    width: '130%',
    height: '1px',
    backgroundImage:
      'linear-gradient(to right, transparent, var(--dark-beige), transparent)',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 0,

    medium: {
      content: isActive ? '""' : undefined,
    },
  },
})

const STATUS_COLOR = {
  WON: 'var(--light-shadowfen)',
  DRAW: 'var(--light-winter)',
  FORFEIT: 'var(--light-swarm)',
  SURRENDERED: 'var(--light-ironclad)',
  LOST: 'var(--ironclad)',
}

const status = ({ status }) => ({
  color: STATUS_COLOR[status],
})

const styles = {
  matches,
  table,
  edit,
  milestone,
  status,
}

export default styles
