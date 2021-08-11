const sparkles = {
  display: 'inline-block',
  position: 'relative',
}

const sparkle = {
  position: 'absolute',
  display: 'block',
  pointerEvents: 'none',
  animationDuration: '700ms',
  animationFillMode: 'forwards',
  animationName: {
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(0)' },
    '50%': { transform: 'scale(1)' },
  },
}

const svg = {
  display: 'block',
  animationName: { to: { transform: 'rotate(0.5turn)' } },
  animationDuration: '1000ms',
  animationTimingFunction: 'linear',
}

export default { sparkles, sparkle, svg }
