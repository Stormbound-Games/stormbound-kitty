const BLOCK_NAMES = {
  battleSim: 'Battle Sim',
  card: 'Card',
  deck: 'Deck',
  image: 'Image',
  manaGraph: 'Mana Graph',
  tableOfContents: 'Table of Contents',
  tierList: 'Tier List',
}

function blocksToText(blocks, opts = {}) {
  const options = { nonTextBehavior: 'remove', ...opts }

  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${BLOCK_NAMES[block._type] || block._type} module]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

export default blocksToText
