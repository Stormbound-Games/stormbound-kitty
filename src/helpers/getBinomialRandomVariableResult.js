// Iterate over sequenceLength items, keep each one with probability successProbability
// @param {Number} sequenceLength - Objects
// @param {Float} successProbability - Probability
// @return Number of items that were kept
const getBinomialRandomVariableResult = (
  sequenceLength,
  successProbability
) => {
  return Array.from(
    { length: sequenceLength },
    _ => Math.random() <= successProbability
  ).filter(Boolean).length
}

export default getBinomialRandomVariableResult
