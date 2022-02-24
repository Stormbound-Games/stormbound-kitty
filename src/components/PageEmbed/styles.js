const embed = {
  position: 'relative',
  marginTop: 'var(--s-large)',
  marginBottom: 'var(--s-large)',
  marginLeft: 'auto',
  marginRight: 'auto',

  '@media (min-width: 1200px)': {
    marginLeft: 'calc((1200px - 65ch - var(--s-large) * 2) / 2 * -1)',
    marginRight: 'calc((1200px - 65ch - var(--s-large) * 2) / 2 * -1)',
  },
}

const styles = { embed }

export default styles
