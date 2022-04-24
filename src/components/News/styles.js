const news = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
}

// 1. Give some vertical spacing for the visual artifact between news. However,
//   `--s-base` feels a little tight while `--s-large` feels too wide, so we go
//    in between.
const item = {
  position: 'relative',
  padding: '1.5rem 0', // 1

  // 1. Prevent background color from leaking behind the padding, which is
  //    necessary to have that gap between the filling and the border.
  ':not(:last-child)::after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    width: '0.3em',
    height: '0.3em',
    border: '1px solid var(--beige)',
    backgroundColor: 'var(--beige)', // 1
    backgroundClip: 'content-box', // 1
    padding: '1px', // 1
  },
}

const styles = { news, item }

export default styles
