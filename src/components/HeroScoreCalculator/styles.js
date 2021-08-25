const container = {
  position: 'relative',
}

const score = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '175%',
  color: 'var(--beige)',
}

const radio = {
  display: 'inline-block',

  ':last-child': { marginLeft: 'var(--s-large)' },
}

const styles = { container, score, radio }

export default styles
