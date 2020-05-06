export default (string, length) => {
  if (string.length <= length) return string
  let excerpt = string.slice(0, length)

  while (/[,.?…;\s]$/.test(excerpt)) {
    excerpt = excerpt.slice(0, -1)
  }

  return excerpt + '…'
}
