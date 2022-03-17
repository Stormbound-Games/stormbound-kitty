const entry = {
  display: 'flex',
}

const left = {
  display: 'none',

  medium: {
    marginRight: '2ch',
    display: 'block',
  },
}

const icon = ({ iconColor = 'var(--beige)' }) => ({
  position: 'relative',
  top: '0.225em',
  fontSize: '200%',
  opacity: 0.5,
  color: iconColor,
})

const main = {
  marginTop: 0,
  color: 'var(--white)',
}

const date = {
  color: 'var(--beige)',
  textTransform: 'uppercase',
  fontSize: '75%',
  letterSpacing: '1px',
}

const right = {
  marginLeft: 'auto',
  alignSelf: 'center',
  paddingLeft: 'var(--s-base)',
}

const styles = {
  entry,
  left,
  icon,
  main,
  date,
  right,
}

export default styles
