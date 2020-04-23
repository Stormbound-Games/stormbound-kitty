const getBinomialRandomVariableResult = (n, p) => {
  // Iterate over n objects, keep each one with probability p
  // Return how many objects were kept
  return Array.from({ length: n }, _ => Math.random() <= p).filter(Boolean)
    .length
}
export default getBinomialRandomVariableResult
