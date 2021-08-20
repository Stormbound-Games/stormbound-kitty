const fullWidth = {
  position: 'relative',
  marginTop: 'var(--s-large)',
  marginBottom: 'var(--s-large)',
  marginLeft: 'auto',
  marginRight: 'auto',

  '@media (min-width: 1200px)': {
    /**
     * 1. Negate half the layout body horizontal padding.
     */
    marginLeft: 'calc(-50vw + 1200px / 2)',
    marginRight: 'calc(-50vw + 1200px / 2)',
    padding: '0 calc(var(--padding, 100px) + 0.625em)' /* 1 */,
  },
}

const styles = { fullWidth }

export default styles
