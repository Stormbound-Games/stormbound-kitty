const pulse = {
  to: { transform: 'scale(2.5)', opacity: 0 },
}

const dot = {
  top: 0,
  left: 'calc(100% + 0.5ch)',
  content: '""',
  position: 'absolute',
  width: '0.5em',
  height: '0.5em',
  borderRadius: '50%',
  backgroundColor: '#cb2b43',
}

// 1. Use a second pseudo-element that’s scaled up to avoid animating box-shadow
//    which cannot be hardware-accelerated and is flagged by Lighthouse as an
//    improvement.
// 2. There appears to be an issue with Fela rehydration when animations are
//    applied on pseudo-elements somewhat. Defining the animation on the element
//    (without running it) and inheriting it seems to do the trick.
const newPulse = {
  position: 'relative',
  animationName: pulse,
  animationDuration: '0ms',

  '::before': dot,

  '::after': {
    ...dot, // 1
    animationName: 'inherit', // 2
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-out',
  },
}

const styles = { newPulse }

export default styles
