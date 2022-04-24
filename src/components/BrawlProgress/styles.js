// 1. Position all list items on the same row.
// 2. Size the list based on its content.
const progress = {
  display: 'flex', // 1
  listStyleType: 'none',
  padding: 0,
  margin: 'var(--s-large) auto',
  width: 'max-content', // 2
  fontSize: '85%',
}

// 1. Arbitrary width that allow fitting 10 items on the same row on mobile.
const item = ({ isActive, isPassed }) => ({
  width: '1.25em', // 1
  height: '1.25em', // 1
  border: '2px solid var(--beige)',
  transform: 'rotate(45deg)',
  margin: '0 var(--s-smaller)',
  position: 'relative',
  backgroundColor: isPassed ? '#8db22c' : undefined,

  // 1. Beige filling of the currently active item while making it possible to
  //    apply a background color to the item itself, which is necessary for passed
  //    milestones.
  '::before': {
    content: '""', // 1
    position: 'absolute',
    top: '0.2em',
    right: '0.2em',
    bottom: '0.2em',
    left: '0.2em',
    backgroundColor: 'var(--beige)',
    transform: isActive ? 'scale(1)' : 'scale(0)',
    transition: '250ms',
  },

  // 1. Small connector between passed milestones.
  // 2. Matches the thickness of the parent’s border.
  ':not(:last-child)::after': {
    content: isPassed ? '""' : undefined, // 1
    height: '2px', // 2
    width: '1em',
    left: '100%',
    backgroundColor: 'var(--beige)',
    position: 'absolute',
    bottom: '100%',
    transform: 'translateY(50%) rotate(-45deg)',
    transformOrigin: 'bottom left',
  },
})

const button = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',
}

const styles = { progress, item, button }

export default styles
