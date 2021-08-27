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

/**
 * 1. Use a second pseudo-element that’s scaled up to avoid animating box-shadow
 *    which cannot be hardware-accelerated and is flagged by Lighthouse as an
 *    improvement.
 */
const newPulse = {
  position: 'relative',

  '::before': dot,

  '::after': {
    /* 1 */ ...dot,
    animationName: pulse,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-out',
  },
}

const styles = { newPulse }

export default styles
