const appearMarkers = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 0.4,
  },
}

// 1. Initialize counters for rows (at 6 so it goes from bottom to top) and
//    columns markers
const grid = {
  counterReset: 'row 6 column', // 1
}

// 1. Position context for cell content
const cell = ({ withGridMarkers, rowIndex }) => ({
  flex: '1 0 auto',
  position: 'relative', // 1

  // 1. Ensure proper cell ratio based on background
  '::before': {
    content: '""', // 1
    display: 'block', // 1
    paddingTop: '85%', // 1
  },

  // 1. Only display the row markers when enabled
  // 2. Vertical centering of the marker in the row
  // 3. Spacing of the marker from the row’s left edge
  // 4. Horizontal align the letter “D” with other markers
  ':first-child::after': {
    content: withGridMarkers ? 'counter(row)' : undefined, // 1
    position: 'absolute',
    fontSize: '5vw',
    opacity: 0.7,
    animationName: appearMarkers,
    animationDuration: '0.4s',
    animationFillMode: 'both',
    color: 'var(--black)',
    top: '50%', // 2
    transform:
      rowIndex === 3 ? 'translateX(15%) translateY(-50%)' : 'translateY(-50%)', // 2, 4
    right: '100%', // 3
    marginRight: '1.5ch', // 3
    textAlign: 'right',

    medium: {
      fontSize: '150%',
    },
  },

  // 1. Every cell of the first row should increment the column counter
  ...(rowIndex === 0
    ? {
        counterIncrement: 'column', // 1
      }
    : {}),

  // 1. Readjust the horizontal centering of the column marker in the cell
  ':nth-child(3) > *::after':
    rowIndex === 0
      ? {
          transform: 'translateX(-50%) translateX(10%)', // 1
        }
      : {},

  ':nth-child(4) > *::after':
    rowIndex === 0
      ? {
          transform: 'translateX(-50%) translateX(20%)', // 1
        }
      : {},
})

// 1. Full size container for actual content
const cellContent = ({ withGridMarkers, rowIndex }) => ({
  position: 'absolute', // 1
  top: 0, // 1
  left: 0, // 1
  right: 0, // 1
  bottom: 0, // 1

  // 1. Only display the column markers when enabled
  // 2. Horizontal centering of the marker in the column
  // 3. Spacing of the marker from the column’s top edge
  '::after': {
    content:
      rowIndex === 0 && withGridMarkers
        ? 'counter(column, upper-alpha)'
        : undefined, // 1
    position: 'absolute',
    fontSize: '5vw',
    opacity: 0.7,
    animationName: appearMarkers,
    animationDuration: '0.4s',
    animationFillMode: 'both',
    left: '50%', // 2
    transform: 'translateX(-50%)', // 2
    textAlign: 'center', // 2
    bottom: '110%', // 3

    medium: {
      fontSize: '150%',
    },
  },
})

const styles = { grid, cell, cellContent }

export default styles
