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

  ':last-child': { marginLeft: '2em' },
}

export default {
  container,
  score,
  radio,
}
