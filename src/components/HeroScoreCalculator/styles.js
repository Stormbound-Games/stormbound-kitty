const container = {
  position: 'relative',
}

const formula = {
  maxWidth: '100%',
  marginBottom: '1.5em',
}

const image = {
  maxWidth: '100%',
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
  formula,
  image,
  score,
  radio,
}
