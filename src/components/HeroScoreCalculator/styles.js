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

const explanation = {
  margin: 0,
  paddingLeft: 'var(--s-base)',
}

const styles = { container, explanation, score, radio }

export default styles
