const container = {
  fontSize: '80%',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 20,
  perspective: 1000,

  '[aria-hidden="true"]': { display: 'none' },
}

const overlay = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: -1,
}

const image = {
  position: 'absolute',
  bottom: '80%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '200px',
  zIndex: -1,
}

const content = {
  margin: 'auto',
  width: '350px',
  maxWidth: '85%',
  position: 'relative',
  backgroundColor: 'var(--dark-blue)',
  border: '1px solid var(--dark-beige)',
  borderRadius: '0.3em',
  animationName: {
    from: { opacity: 0, transform: 'translateY(-10%) rotateX(20deg)' },
    to: { opacity: 1, transform: 'translateY(0%)' },
  },
  animationDuration: '750ms',
  animationTimingFunction: 'ease-out',
  animationFillMode: 'both',
  boxShadow: '0 0 0 3px var(--dark-blue)',
  textAlign: 'center',
}

const header = {
  padding: '1em',
  backgroundColor: 'var(--light-blue)',
  borderRadius: '0.3em 0.3em 0 0',
}

const title = {
  paddingBottom: 0,
  marginTop: 0,
  marginBottom: 0,
}

const body = ({ withCTA }) => ({
  padding: '1em',
  backgroundColor: 'var(--dark-blue)',
  paddingBottom: withCTA ? '2em' : '1em',
})

const button = {
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translate(50%, -50%)',
  color: 'var(--dark-blue)',
}

const cta = {
  position: 'absolute',
  left: '50%',
  top: '100%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
}

export default {
  container,
  overlay,
  image,
  content,
  header,
  title,
  body,
  button,
  cta,
}
