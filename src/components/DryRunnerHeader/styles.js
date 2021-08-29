const header = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0 calc(var(--s-smaller) * -1)',

  medium: { flexDirection: 'row', margin: 0 },
}

const button = {
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',

  small: {
    width: '50%',
    padding: '0 var(--s-smaller)',
  },
}

const mana = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '125%',

  small: {
    order: -1,
    flex: '1 0 100%',
    marginBottom: 'var(--s-small)',
  },
}

const styles = { header, button, mana }

export default styles
