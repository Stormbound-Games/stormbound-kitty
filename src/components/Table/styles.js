const table = ({ isZebra }) => ({
  textAlign: 'center',
  tableLayout: 'fixed',
  maxWidth: '100%',
  width: '100%',
  borderCollapse: 'collapse',
  color: isZebra ? '#9fd4e7' : undefined,
  overflow: isZebra ? 'hidden' : undefined,
  position: isZebra ? 'relative' : undefined,

  /**
   * 1. Border allowing for seeing the zebra rows a few pixels all around the
   *    table, effectively an inner border.
   */
  '::before': {
    content: isZebra ? '""' : undefined /* 1 */,
    position: 'absolute',
    top: '3px',
    right: '3px',
    bottom: '3px',
    left: '3px',
    border: '1px solid var(--dark-beige)',
    pointerEvents: 'none',
  },

  /**
   * 1. Hide the table headers.
   */
  '> thead': {
    backgroundColor: isZebra ? 'var(--dark-blue)' : undefined,

    small: {
      display: 'block',
      position: 'absolute' /* 1 */,
      top: '-9999px' /* 1 */,
      left: '-9999px' /* 1 */,
    },

    '> tr > th': {
      color: isZebra ? 'var(--beige)' : undefined,
    },
  },

  '> tbody': {
    '> tr:nth-child(even)': {
      backgroundColor: isZebra ? '#1e4858' : undefined,
    },

    '> tr:nth-child(odd)': {
      backgroundColor: isZebra ? 'var(--light-blue)' : undefined /* 1 */,
    },

    small: { display: 'block' },
  },

  /**
   * 1. Avoid double borders on the top of the table.
   */
  '> * > tr': {
    small: {
      display: 'block',
      padding: 'var(--s-smaller) 0',
      border: '1px solid var(--dark-beige)',
      ':not(:first-child)': { borderTop: 0 /* 1 */ },
    },
  },

  '> * > tr > td': {
    small: {
      padding: 'var(--s-smallest) var(--s-base)',
      textAlign: 'left',

      '[data-label]::before': {
        color: 'var(--beige)',
        width: '50%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'inline-block',
        content: 'attr(data-label)',
        paddingRight: '1ch',
      },
    },
  },

  '> * > tr > *': {
    padding: 'var(--s-small) var(--s-smaller)',
    textAlign: 'center',
    position: 'relative',

    ':not(:empty)': {
      border: isZebra ? undefined : '1px solid #ffffff33',
      small: { border: 0 },
    },

    small: {
      display: 'block',
    },
  },

  small: {
    textAlign: 'left',
    display: 'block',

    /**
     * 1. Hide the fake border around the table since table rows are using borders
     *    on mobile.
     */
    '::before': {
      content: 'none' /* 1 */,
    },
  },
})

const styles = { table }

export default styles
