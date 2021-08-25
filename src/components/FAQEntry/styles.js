const pulse = {
  from: { boxShadow: 'none' },
  '50%': {
    boxShadow: '0 0 0 1px var(--black), 0 0 0 2px var(--beige)',
  },
  to: {
    boxShadow: '0 0 0 1px var(--black), 0 0 0 2px #ded7a400',
  },
}

const entry = {
  marginBottom: 'var(--s-smaller)',
  fontSize: '120%',
  position: 'relative',

  ':target::after': {
    content: '""',
    width: '0.4em',
    height: '0.4em',
    position: 'absolute',
    top: '0.35em',
    right: '100%',
    marginRight: 'var(--s-small)',
    border: '1px solid',
    transform: 'rotate(45deg)',
    animationName: pulse,
    animationDuration: '5000ms',
    animationIterationCount: 'infinite',
  },
}

const link = {
  color: 'var(--beige)',
  textDecoration: 'none',

  ':hover': {
    borderBottom: '1px solid',
  },
}

const answer = {
  margin: '0 0 var(--s-larger)',
}

const styles = {
  pulse,
  entry,
  link,
  answer,
}

export default styles
