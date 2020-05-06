const generateId = content =>
  content
    .toLowerCase()
    .replace(/['’,]/g, '')
    .replace(/[\s/]+/g, '-')

export default generateId
