// 1. √(34 * 34 / 2) or accurate width and height to have a diagonal exactly
//    equal to the height of the progress bar (34px).
// 2. Soften the corners to make the transition between the top/bottom border
//    and the pseudo-element smoother.
const barPseudo = {
  content: '""',
  boxSizing: 'border-box',
  position: 'absolute',
  right: 0,
  top: '50%',
  width: '24.041630560342615px', // 1
  height: '24.041630560342615px', // 1
  backgroundImage:
    'linear-gradient(to bottom left, var(--black) 50%, transparent 50%)',
  borderRight: '1px solid var(--dark-beige)',
  borderTop: '1px solid var(--dark-beige)',
  borderRadius: '1px 0 1px 0', // 2
  transform: 'translate(50%, -50%) rotate(45deg)',
}

// 1. Arbitrary dimensions for the progress bar.
// 3. Remove right border to have the pointy edge.
// 4. Soften the corners to make the transition between the top/bottom border
//    and the pseudo-element smoother.
const bar = {
  height: '34px', // 1
  width: '15em', // 1
  maxWidth: '100%',
  padding: '3px',
  backgroundColor: 'var(--black)',
  border: '1px solid var(--dark-beige)',
  borderRight: 0, // 2
  borderLeft: 0, // 2
  borderRadius: '0 1px 1px 0', // 3
  position: 'relative',

  '::after': {
    ...barPseudo,
  },

  '::before': {
    ...barPseudo,
    left: 0,
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    borderRadius: '0 1px 0 1px', // 2
    borderRight: 0,
    borderLeft: '1px solid var(--dark-beige)',
    backgroundImage:
      'linear-gradient(to bottom right, var(--black) 50%, transparent 50%)',
  },
}

// 1. √(26 * 26 / 2) or accurate width and height to have a diagonal exactly
//    equal to the height of the filling (34px - 3px * 2 - 1px * 2).
const innerPseudo = {
  content: '""',
  boxSizing: 'border-box',
  position: 'absolute',
  right: 0,
  top: '50%',
  width: '18.384776310850235px', // 1
  height: '18.384776310850235px', // 1
  transform: 'translate(50%, -50%) rotate(45deg)',
  backgroundImage:
    'linear-gradient(to bottom left, #8db22c 50%, transparent 50%)',
  zIndex: 2,
}

const inner = {
  height: '100%',
  backgroundColor: '#8db22c',
  position: 'relative',
  transition: '250ms',

  '::after': {
    ...innerPseudo,
  },

  '::before': {
    ...innerPseudo,
    left: 0,
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    backgroundImage:
      'linear-gradient(to bottom right, #8db22c 50%, transparent 50%)',
  },

  "[aria-valuenow='0']::before": {
    content: 'none',
  },

  ":not([aria-valuenow='100'])::after": {
    content: 'none',
  },
}

const label = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
}

const styles = { bar, inner, label }

export default styles
