const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 'var(--s-base)',

  medium: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}

const collection = {
  small: { order: -1 },
}

const styles = { container, collection }

export default styles
