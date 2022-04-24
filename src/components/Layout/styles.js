const layout = {
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
}

// 1. Kind of a legacy decision from back when only the battle sim existed, and
//    where a lot of information had to be packed in little space. This
//    technically should be reverted but is pretty difficult without
//    meticulously going through everything.
const body = {
  padding: 'var(--s-large)',
  fontSize: '90%', // 1
  display: 'flex',
  flexDirection: 'column',
  width: '1200px',
  maxWidth: '100%',
  margin: '0 auto',

  medium: {
    paddingTop: 'var(--s-largest)',
    paddingBottom: 'var(--s-largest)',
  },
}

const styles = { layout, body }

export default styles
