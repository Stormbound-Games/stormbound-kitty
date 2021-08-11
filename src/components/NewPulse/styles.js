const pulse = {
  from: { boxShadow: '0 0 0 0 rgba(203, 43, 67, 0.6)' },

  '50%': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 0 0.5em transparent',
  },

  to: { boxShadow: '0 0 0 0 transparent' },
}

const newPulse = {
  position: 'relative',

  '::after': {
    top: 0,
    left: 'calc(100% + 0.5ch)',
    content: '""',
    position: 'absolute',
    width: '0.5em',
    height: '0.5em',
    borderRadius: '50%',
    backgroundColor: 'rgba(203, 43, 67, 1)',
    animationName: pulse,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-out',
  },
}

export default { newPulse }
