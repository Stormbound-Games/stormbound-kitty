const controls = {
  display: 'flex',
}

const cardHolder = {
  width: '225px',
  margin: '3em auto',
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
    padding: '0.75em 0.5em',
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
