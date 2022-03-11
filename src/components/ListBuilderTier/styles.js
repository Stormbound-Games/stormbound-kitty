const list = {
  listStyle: 'none',
  paddingLeft: 0,
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',

  medium: {
    marginLeft: 'calc(var(--s-smallest) * -1)',
    marginRight: 'calc(var(--s-smallest) * -1)',
  },
}

const empty = {
  color: 'var(--beige)',
  margin: 0,
}

const styles = { list, empty }

export default styles
