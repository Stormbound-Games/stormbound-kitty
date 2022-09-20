import findHeadings from '#helpers/findHeadings'

const get = (object, path) => path.reduce((prev, curr) => prev[curr], object)
const getObjectPath = path =>
  path.length === 0
    ? path
    : ['subheadings'].concat(path.join('.subheadings.').split('.'))

const parseOutline = (ast, isDeep) => {
  const outline = { subheadings: [] }
  const headings = findHeadings(ast, isDeep)
  const path = []
  let lastLevel = 0

  headings.forEach(heading => {
    if (heading.level < lastLevel)
      for (let i = lastLevel; i >= heading.level; i--) path.pop()
    else if (heading.level === lastLevel) path.pop()

    const prop = get(outline, getObjectPath(path))
    prop.subheadings.push(heading)
    path.push(prop.subheadings.length - 1)
    lastLevel = heading.level
  })

  return outline.subheadings
}

export default parseOutline
