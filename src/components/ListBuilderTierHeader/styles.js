const row = {
  display: 'flex',
  flexDirection: 'column',

  medium: {
    marginLeft: 'calc(var(--s-smallest) * -1)',
    marginRight: 'calc(var(--s-smallest) * -1)',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
}

const name = {
  margin: 0,
}

const item = {
  flex: '0 0 100%',
  marginBottom: 'var(--s-small)',

  medium: {
    flexBasis: 'calc(50% - var(--s-smallest) * 2)',
    marginLeft: 'var(--s-smallest)',
    marginRight: 'var(--s-smallest)',
  },
}

const move = {
  textDecoration: 'none',

  ':first-child': { marginLeft: 'var(--s-smaller)' },
  ':last-child': { marginLeft: 'var(--s-base)' },
}

const buttons = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 'var(--s-base)',
}

const styles = { row, name, item, move, buttons }

export default styles
