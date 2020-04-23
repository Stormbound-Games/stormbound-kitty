// Iterate over sequence_length items, keep each one with probability success_probability
// @param {Number} sequence_length - Objects
// @param {Float} success_probability - Probability
// @return Number of items that were kept
const getBinomialRandomVariableResult = (
  sequence_length,
  success_probability
) => {
  return Array.from(
    { length: sequence_length },
    _ => Math.random() <= success_probability
  ).filter(Boolean).length
}

export default getBinomialRandomVariableResult
