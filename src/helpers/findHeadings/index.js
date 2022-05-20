import speakingurl from 'speakingurl'
import getChildrenText from '~/helpers/getChildrenText'

const filter = (ast, match) =>
  ast.reduce((acc, node) => {
    if (match(node)) acc.push(node)
    if (node.children) acc.push(...filter(node.children, match))
    return acc
  }, [])

const findHeadings = (ast, isDeep = false) =>
  filter(
    ast,
    isDeep ? node => /h\d/.test(node.style) : node => /h2/.test(node.style)
  ).map(node => {
    const text = getChildrenText(node)
    const slug = speakingurl(text)
    const level = Number(node.style.slice(1))

    return { ...node, text, slug, level, subheadings: [] }
  })

export default findHeadings
