// 1. On desktop, the submit button is replacing the index in the first column
//    but on mobile it should be displayed as a proper CTA after the fields,
//    which requires flex to enable `order`.
const form = {
  small: {
    display: 'flex !important', // 1
    flexDirection: 'column',
    flexWrap: 'wrap',

    '> td': {
      display: 'flex',
      justifyContent: 'center',
    },

    // 1. Place the cell containing the CTA after the other cells containing
    //    the fields.
    '> td:first-child': {
      order: 1, // 1
      textAlign: 'center',
      paddingTop: 'var(--s-small)',
    },
  },
}

// 1. Inline the <input> and <select> elements within the table row by removing
//    their border and inner spacing.
// 2. Chrome hack to center the text of a <select> element.
const field = {
  borderTop: 0, // 1
  borderRight: 0, // 1
  borderBottom: 0, // 1
  borderLeft: 0, // 1
  paddingTop: 0, // 1
  paddingRight: 0, // 1
  paddingBottom: 0, // 1
  paddingLeft: 0, // 1
  width: '50%',

  medium: {
    width: '100%',
    textAlign: 'center',
    textAlignLast: 'center', // 2
  },
}

const styles = { form, field }

export default styles
