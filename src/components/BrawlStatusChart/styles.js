/**
 * 1. Reduce the gap between the title and the chart, since the chart includes
 *    some white space already.
 */
const title = {
  marginBottom: 0 /* 1 */,
}

const select = {
  border: 0,
  padding: 0,
  color: 'inherit',
  textTransform: 'inherit',
  textDecoration: 'underline',
  width: 'calc(var(--length) * var(--multiplier))',
}

const styles = { title, select }

export default styles
