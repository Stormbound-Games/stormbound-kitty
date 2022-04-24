// 1. Vertical gradient borders of the sides of the container to hide the
//    overflow.
const milestonesPseudo = {
  content: '""', // 1
  width: '2px',
  height: '100%',
  backgroundImage:
    'linear-gradient(to bottom, transparent, var(--beige), transparent)',
  position: 'absolute',
  zIndex: 3,
  top: 0,
}

// 1. All milestones are aligned on a single row, so this prevents them to be
//    seen beyond the borders of the container.
const milestones = {
  margin: '0 auto var(--s-larger)',
  overflow: 'hidden', // 1
  position: 'relative',

  medium: {
    '::before': { ...milestonesPseudo, left: 0 },
    '::after': { ...milestonesPseudo, right: 0 },
  },
}

// 1. `20em` is the hard-coded with of a milestone in `.BrawlMilestone`. It
//    could come from a variable if we wanted to make it a little better. `2em`
//    is the horizontal padding of `.BrawlMilestones__item`.
// 2. Originally shift its position by half the width of its parent so the
//    current milestone is displayed at the center.
const inner = {
  width: 'calc((20em + 1.5em * 2) * var(--count))', // 1
  transition: 'transform 1000ms',
  position: 'relative', // 2
  left: '50%', // 2
}

// 1. Force all milestones on the same width.
const wrapper = {
  display: 'flex', // 1
}

const item = {
  padding: '1.5em',
}

const styles = { milestones, inner, wrapper, item }

export default styles
