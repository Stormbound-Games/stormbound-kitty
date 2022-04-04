const footer = {
  padding: 'var(--s-base) 0',
  backgroundImage: 'linear-gradient(to top, transparent, #ded7a414)',
  position: 'relative',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    backgroundImage:
      'linear-gradient(to right, transparent, var(--beige), transparent)',
  },
}

const inner = {
  margin: '0 auto',
  padding: 'var(--s-large) var(--s-large) var(--s-base)',
  width: '1200px',
  maxWidth: '100%',
}

const info = {
  maxWidth: '40ch',
  marginBottom: 'var(--s-small)',
}

const icon = {
  transform: 'translateY(2px)',
  margin: '0 var(--s-smallest)',
  color: 'var(--beige)',
}

const list = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
}

const heading = {
  color: 'var(--beige)',
  textTransform: 'uppercase',
  marginBottom: 'var(--s-base)',
}

const item = {
  margin: 'var(--s-smallest) 0',
  '> a': { textDecoration: 'none' },
}

const sponsors = {
  marginTop: 'var(--s-base)',
  marginBottom: 0,
  display: 'flex',
  flexWrap: 'wrap',
}

const styles = {
  footer,
  inner,
  info,
  icon,
  list,
  heading,
  item,
  sponsors,
}

export default styles
