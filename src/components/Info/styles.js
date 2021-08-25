const info = ({ withCta }) => ({
  border: '1px solid var(--dark-beige)',
  borderRadius: '3px',
  padding: 'var(--s-base)',
  position: 'relative',
  paddingBottom: withCta ? '2.25em' : undefined,
})

const title = {
  position: 'absolute',
  bottom: '100%',
  transform: 'translateY(50%)',
  padding: '0 var(--s-smaller)',
  left: '1em',
  backgroundColor: 'var(--black)',
  color: 'var(--beige)',
  fontSize: '90%',
  textTransform: 'uppercase',
}

const icon = {
  marginRight: 'var(--s-smallest)',
  position: 'relative',
  top: '1.5px',
}

const cta = {
  position: 'absolute',
  left: '50%',
  top: '100%',
  transform: 'translate(-50%, -50%) translateY(3px)',
  width: '50%',
  textAlign: 'center',
}

const styles = { info, title, icon, cta }

export default styles
