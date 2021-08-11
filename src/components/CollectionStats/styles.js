const checkbox = {
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  fontSize: '90%',
}

const chart = {
  marginBottom: '3em',
}

/**
 * 1. The diagram themselves have quite some spacing, so the margin below the
 *    title is unnecessary.
 */
const title = {
  marginBottom: 0 /* 1 */,
}

export default {
  checkbox,
  chart,
  title,
}
