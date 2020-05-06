export default (array = [], size = 1) => {
  const clone = [...array]

  if (size < 1) return []

  return new Array(Math.ceil(clone.length / size))
    .fill()
    .map(_ => clone.splice(0, size))
}
