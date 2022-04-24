const header = {
  display: 'flex',
  borderBottom: '1px solid var(--dark-beige)',
  color: 'var(--beige)',
  marginBottom: 'var(--s-large)',
  fontSize: '80%',

  medium: { fontSize: '100%' },
}

// 1. Aligned with the bottom spacing of the Select component, which matters on
//    mobile where a misalignment looks awkward.
const label = {
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: '0.65em', // 1
}

const sort = {
  marginLeft: 'auto',
  marginRight: 'var(--s-base)',
  position: 'relative',
}

const select = {
  border: 0,
  borderRadius: 0,
}

const layout = {
  display: 'flex',
  justifyContent: 'flex-end',
}

const layoutButton = {
  padding: 'var(--s-smaller)',
  borderBottom: '1px solid transparent',

  '[aria-pressed="true"]': {
    color: 'white',
    borderColor: 'var(--beige)',
  },
}

const styles = { header, label, layout, select, sort, layoutButton }

export default styles
