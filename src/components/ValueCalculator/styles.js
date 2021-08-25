const controls = {
  display: 'flex',
}

const cardHolder = {
  width: '225px',
  margin: 'var(--s-larger) auto',
}

const table = {
  textAlign: 'center',
  tableLayout: 'fixed',
  width: '100%',
  borderCollapse: 'collapse',

  '> thead > tr > th': {
    color: 'var(--beige)',
  },

  '> * > tr > *': {
    padding: 'var(--s-small) var(--s-smaller)',
    textAlign: 'center',
    position: 'relative',
    border: '1px solid #ffffff33',
  },
}

const hint = {
  medium: {
    textAlign: 'center',
  },
}

const styles = { controls, cardHolder, table, hint }

export default styles
