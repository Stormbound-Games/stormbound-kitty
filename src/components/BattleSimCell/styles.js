// 1. Position context for active state pseudo-element
// 2. Perspect context for active state pseudo-element
const cell = ({ isActive, isDragging, isDisplay, isFrozen, activePlayer }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  width: '100%',
  height: '100%',
  transition: 'background-color 0.25s',
  cursor: isDragging ? 'move' : isDisplay ? 'default' : 'pointer',
  position: isActive ? 'relative' : undefined, // 1
  perspective: isActive || isFrozen ? '1000px' : undefined, // 2
  backgroundImage: isFrozen
    ? 'radial-gradient(closest-side, var(--freeze), transparent)'
    : undefined,

  // 1. Ensure 1:1 ratio based on width
  // 2. Center in parent, scale down, rotate for perspective, then rotate for diamond shape
  // 3. Absolute centering in parent
  // 4. Ensure it appears below image and strength marker
  // 5. Fade-in animation
  '::before': {
    content: isActive ? '""' : undefined,
    color:
      activePlayer === 'RED'
        ? 'var(--player-red)'
        : activePlayer === 'BLUE'
        ? 'var(--player-blue)'
        : 'var(--black)',
    outline: 0,
    width: '100%', // 1
    paddingTop: '100%', // 1
    border: '2px solid',
    transform: 'translate(-50%, -50%) scale(0.66) rotateX(30deg) rotate(45deg)', // 2
    position: 'absolute', // 3
    top: '50%', // 3
    left: '50%', // 3
    zIndex: -1, // 4
    animationName: { from: { opacity: 0 } },
    animationDuration: '0.4s',
    animationFillMode: 'both', // 5
    clipPath:
      'polygon(0 0,0 100%,10% 100%,10% 50%,10% 50%,10.3% 45%,11.3% 40.1%,12.8% 35.3%,14.9% 30.7%,17.6% 37.5%,20.8% 22.6%,24.5% 19.2%,28.6% 16.2%,33% 13.8%,37.6% 12%,42.5% 10.7%,47.5% 10%,52.5% 10%,57.5% 10.7%,62.4% 12%,67% 13.8%,71.4% 16.2%,75.5% 19.2%,79.2% 22.6%,82.4% 26.5%,80.1% 30.7%,87.2% 35.3%,88.7% 40.1%,89.7% 45%,90% 50%,89.7% 55%,88.7% 59.9%,87.2% 64.7%,85.1% 69.3%,82.4% 73.5%,79.2% 77.4%,75.5% 80.8%,71.4% 83.8%,67% 86.2%,62.4% 88%,57.5% 89.3%,52.5% 89.9%,47.5% 89.9%,42.5% 89.3%,37.6% 88%,33% 86.2%,28.6% 83.8%,24.5% 80.8%,20.8% 77.4%,17.6% 73.5%,14.9% 69.3%,12.8% 64.7%,11.3% 59.9%,10.3% 55%,10% 50%,10% 100%,100% 100%,100% 0,100% 0)',
    backgroundImage:
      'linear-gradient(to bottom right, transparent calc(50% - 1px), currentcolor calc(50% - 1px), currentcolor calc(50% + 1px), transparent calc(50% + 1px)), linear-gradient(to bottom left, transparent calc(50% - 1px), currentcolor calc(50% - 1px), currentcolor calc(50% + 1px), transparent calc(50% + 1px))',
  },

  ':not([disabled]):hover': {
    backgroundColor: !isDisplay ? '#ffffffb3' : undefined,
  },
})

// 1. Ensure the strength marker appears on top of image
const strength = ({ player }) => ({
  position: 'absolute',
  bottom: '15%',
  left: '10%',
  width: '25%',
  fontSize: '80%',
  color: 'var(--white)',
  zIndex: 2, // 1

  '::before': {
    content: '""',
    display: 'block',
    paddingTop: '100%',
  },

  // 1. Ensure the strength marker background appear under text
  // 2. Absolute centering in parent
  '::after': {
    content: '""',
    zIndex: -1, // 1
    width: '100%',
    height: '100%',
    position: 'absolute', // 2
    left: '50%', // 2
    top: '50%', // 2
    transform: 'translate(-50%, -50%) rotate(45deg)', // 2
    border: '1px solid var(--black)',
    backgroundColor:
      player === 'RED'
        ? 'var(--player-red)'
        : player === 'BLUE'
        ? 'var(--player-blue)'
        : undefined,
  },
})

// 1. Absolute centering in parent
const strengthContent = {
  position: 'absolute', // 1
  top: '50%', // 1
  left: '50%', // 1
  transform: 'translate(-50%, -50%)', // 1

  // 1. On mobile where it takes the full available width, scale the font size
  //    based on the viewport width
  small: {
    fontSize: '2.5vw', // 1
  },
}

const image = {
  display: 'block',
  height: '100%',
  objectFit: 'contain',
  pointerEvents: 'none',
  transition: 'filter 1s',
  margin: 'auto',
}

const frozenAnimation = {
  from: {
    transform: 'scale(0.3)',
    opacity: 0,
  },
  to: {
    transform: 'scale(0.3)',
    opacity: 0,
  },
  '50%': {
    transform: 'scale(1)',
    opacity: 1,
  },
}

const frozenPseudo = {
  content: '""',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'block',
  position: 'absolute',
  boxShadow: 'inset 0 0 1em white',
  animationName: frozenAnimation,
  animationDuration: '5000ms',
  animationIterationCount: 'infinite',
  animationFillMode: 'both',
}

const frozen = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '50%',
  left: '50%',
  borderRadius: '0.25em',
  filter: 'blur(1px)',
  zIndex: 2,
  paddingTop: '100%',
  transform: 'translate(-50%, -50%) scale(0.66) rotateX(30deg) rotate(45deg)',

  '::after': {
    ...frozenPseudo,
    animationDirection: 'reverse',
    animationDelay: '500ms',
    animationDuration: '4000ms',
  },

  '::before': frozenPseudo,
}

const disabled = {
  lineHeight: 1,
  color: 'var(--disabled)',
  fontSize: '225%',
  position: 'absolute',
  bottom: '-0.1em',
  right: 0,
  WebkitTextStroke: '1px #00000080',
}

const dots = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const poison = {
  from: {
    opacity: 0,
    transform: 'scale(0) translateY(0) rotate(45deg)',
  },

  '25%': {
    opacity: 0.5,
    transform: 'scale(0.5) translateY(100%) rotate(45deg)',
  },

  '50%': {
    opacity: 1,
    transform: 'scale(1) translateY(-100%) rotate(45deg)',
  },

  '55%': {
    opacity: 0,
    transform: 'scale(0.75) translateY(-100%) rotate(45deg)',
  },

  '60%': {
    opacity: 0,
    transform: 'scale(0) translateY(0) rotate(45deg)',
  },
  to: {
    opacity: 0,
    transform: 'scale(0) translateY(0) rotate(45deg)',
  },
}

const dot = ({ isBubble, isConfused, isPoisoned, isVitalized }) => ({
  position: 'absolute',
  width: '0.6em',
  height: '0.6em',
  display: 'block',
  animationName: poison,
  animationDuration: '3500ms',
  animationFillMode: 'both',
  animationDirection: 'alternate-reverse',
  animationIterationCount: 'infinite',
  zIndex: 2,

  ...(isConfused
    ? {
        backgroundColor: 'var(--confused)',
        borderRadius: '50%',
        animationDirection: 'alternate',
      }
    : {}),

  ...(isPoisoned
    ? {
        backgroundColor: isBubble ? 'greenyellow' : 'var(--poison)',
        animationDirection: 'reverse',

        ...(isBubble
          ? {
              borderRadius: '50%',
              width: '0.4em',
              height: '0.4em',
            }
          : {}),
      }
    : {}),

  ...(isVitalized
    ? {
        backgroundColor: isBubble ? 'darkgreen' : 'var(--vitalized)',
        ...(isBubble
          ? {
              borderRadius: '50%',
              width: '0.4em',
              height: '0.4em',
            }
          : undefined),
      }
    : undefined),

  ':nth-child(1)': {
    animationDelay: '250ms',
    left: '50%',
    top: '40%',
  },
  ':nth-child(2)': {
    animationDelay: '-1300ms',
    left: '45%',
    top: '61%',
  },
  ':nth-child(3)': {
    animationDelay: '780ms',
    left: '55%',
    top: '27%',
  },
  ':nth-child(4)': {
    animationDelay: '2250ms',
    left: '60%',
    top: '20%',
  },
  ':nth-child(5)': {
    animationDelay: '-450ms',
    left: '25%',
    top: '14%',
  },
  ':nth-child(6)': {
    animationDelay: '1340ms',
    left: '33%',
    top: '18%',
  },
  ':nth-child(7)': {
    animationDelay: '450ms',
    left: '20%',
    top: '60%',
  },
  ':nth-child(8)': {
    animationDelay: '2000ms',
    left: '74%',
    top: '32%',
  },
  ':nth-child(9)': {
    animationDelay: '150ms',
    left: '58%',
    top: '27%',
  },
  ':nth-child(10)': {
    animationDelay: '580ms',
    left: '46%',
    top: '50%',
  },
})

const styles = {
  cell,
  strength,
  strengthContent,
  image,
  frozen,
  disabled,
  dots,
  dot,
}

export default styles
