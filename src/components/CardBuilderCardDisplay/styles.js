const card = ({ isIrrelevant }) => ({
  opacity: isIrrelevant ? 0.5 : undefined,
  filter: isIrrelevant ? 'grayscale(1)' : undefined,
})

const styles = { card }

export default styles
