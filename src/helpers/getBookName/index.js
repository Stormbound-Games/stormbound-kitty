const getBookName = (bookType, plural = false) => {
  switch (bookType) {
    case 'MYTHIC':
    case 'MYTHIC_BOOK':
      return `Mythic Tome${plural ? 's' : ''}`
    case 'HEROIC':
    case 'HEROIC_BOOK':
      return `Heroic Tome${plural ? 's' : ''}`
    case 'CLASSIC':
    case 'CLASSIC_BOOK':
      return `Classic Tome${plural ? 's' : ''}`
    case 'NOBLE':
    case 'NOBLE_BOOK':
      return `Noble Book${plural ? 's' : ''}`
    case 'HUMBLE':
    case 'HUMBLE_BOOK':
      return `Humble Book${plural ? 's' : ''}`
    case 'PIRATE':
    case 'PIRATE_BOOK':
      return `Book${plural ? 's' : ''} of Pirates`
    case 'FELINE':
    case 'FELINE_BOOK':
      return `Book${plural ? 's' : ''} of Felines`
    case 'ELDER':
    case 'ELDER_BOOK':
      return `Book${plural ? 's' : ''} of Elders`
    case 'DRAGON':
    case 'DRAGON_BOOK':
      return `Book${plural ? 's' : ''} of Dragons`
    case 'ARCHDRAGON':
    case 'ARCHDRAGON_BOOK':
      return `Book${plural ? 's' : ''} of Archdragons`
    case 'STRUCTURE':
    case 'STRUCTURE_BOOK':
      return `Book${plural ? 's' : ''} of Structures`
    case 'MAGIC':
    case 'MAGIC_BOOK':
      return `Book${plural ? 's' : ''} of Magic`
    case 'LEGENDS':
    case 'LEGENDS_BOOK':
      return `Book${plural ? 's' : ''} of Legends`
    case 'CHAOS':
    case 'CHAOS_BOOK':
      return `Book${plural ? 's' : ''} of Chaos`
    default:
      return ``
  }
}

export default getBookName
