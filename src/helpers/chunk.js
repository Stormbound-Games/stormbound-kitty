export default (array, size) => {
  const clone = [...array]

  return new Array(Math.ceil(clone.length / size))
    .fill()
    .map(_ => clone.splice(0, size))
}
