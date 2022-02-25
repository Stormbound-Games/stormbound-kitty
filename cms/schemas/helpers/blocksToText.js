function blocksToText(blocks, opts = {}) {
  const options = { nonTextBehavior: 'remove', ...opts }

  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

export default blocksToText
