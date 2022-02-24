import speakingurl from 'speakingurl'
import getChildrenText from '~/helpers/getChildrenText'

const findHeadings = (ast, deep = false) =>
  ast.reduce((acc, node) => {
    if (node.style === 'h2') {
      const text = getChildrenText(node)
      const id = speakingurl(text)
      acc.push({ _key: node._key, text, id, subtitles: [] })
    } else if (deep && node.style === 'h3' && acc.length) {
      const parent = acc.pop()
      const text = getChildrenText(node)
      const id = speakingurl(text)
      parent.subtitles.push({ _key: node._key, text, id })
      acc.push(parent)
    } else if (node.children) {
      acc.push(...findHeadings(node.children))
    }

    return acc
  }, [])

export default findHeadings
