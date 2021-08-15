const toc = {
  listStyleType: 'none',
  marginLeft: 'var(--s-smaller)',
  paddingLeft: 0,
  borderLeft: '2px solid var(--dark-beige)',
}

const item = {
  position: 'relative',
  paddingLeft: 'var(--s-large)',
  marginTop: 'var(--s-small)',
  marginBottom: 'var(--s-small)',
}

const icon = {
  position: 'absolute',
  right: '100%',
  top: '50%',
  backgroundColor: 'var(--black)',
  transform: 'translateX(50%) translateY(-50%)',
  fontSize: '150%',
  padding: '0.2em',
}

export default { toc, item, icon }
