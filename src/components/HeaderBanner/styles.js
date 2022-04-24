const banner = {
  textAlign: 'center',

  // 1. Position context for the absolutely positioned pseudo-elements.
  medium: {
    position: 'relative', // 1
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'var(--image)',
    textAlign: 'left',

    // 1. Force a certain ratio for the banner, of 1/5 if not given.
    '::before': {
      content: '""',
      display: 'block',
      paddingTop: 'var(--ratio, 20%)', // 1
    },

    // 1. Small gradient line from transparent to beige below the image.
    '::after': {
      content: '""', // 1
      position: 'absolute',
      top: '100%',
      right: 0,
      height: '1px',
      backgroundImage: 'linear-gradient(to left, var(--beige), transparent)',
      width: '100%',
      zIndex: -1,
    },
  },
}

const title = {
  margin: 0,
  lineHeight: 1,
  WebkitTextStroke: '1px var(--black)',
  letterSpacing: '-1px',
  fontSize: '300%',

  // 1. Indent the text to avoid starting on the left edge of the image.
  // 2. Offset the text so it bleeds out of the bottom edge of the image.
  // 3. Prevent long titles from wrapping—not great though.
  medium: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: '500%',
    paddingLeft: '30px', // 1
    transform: 'translateY(30%)', // 2
    overflow: 'hidden', // 3
    textOverflow: 'ellipsis', // 3
    whiteSpace: 'nowrap', // 3
  },
}

const styles = { banner, title }

export default styles
