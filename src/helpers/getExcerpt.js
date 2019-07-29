export default (string, length) => {
  let excerpt = string.slice(0, length)

  while (/[,.?…;\s]$/.test(excerpt)) {
    excerpt = excerpt.slice(0, -1)
  }

  return excerpt + '…'
}
