export default name =>
  name
    .split(/[\s,-]/g)
    .map(word => word.slice(0, 1))
    .join('')
    .toLowerCase()
