export default (array = [], size = 1) => {
  const clone = [...array]

  if (array.length === 0 || size === 1) return array

  return new Array(Math.ceil(clone.length / size))
    .fill()
    .map(_ => clone.splice(0, size))
}
