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
    case 'KNIGHT':
    case 'KNIGHT_BOOK':
      return `Book${plural ? 's' : ''} of Knights`
    case 'FELINE':
    case 'FELINE_BOOK':
      return `Book${plural ? 's' : ''} of Felines`
    case 'CONSTRUCT':
    case 'CONSTRUCT_BOOK':
      return `Book${plural ? 's' : ''} of Constructs`
    case 'RODENT':
    case 'RODENT_BOOK':
      return `Book${plural ? 's' : ''} of Rodents`
    case 'FROSTLING':
    case 'FROSTLING_BOOK':
      return `Book${plural ? 's' : ''} of Frostlings`
    case 'DWARF':
    case 'DWARF_BOOK':
      return `Book${plural ? 's' : ''} of Dwarves`
    case 'UNDEAD':
    case 'UNDEAD_BOOK':
      return `Book${plural ? 's' : ''} of Undead`
    case 'SATYR':
    case 'SATYR_BOOK':
      return `Book${plural ? 's' : ''} of Satyrs`
    case 'TOAD':
    case 'TOAD_BOOK':
      return `Book${plural ? 's' : ''} of Toads`
    case 'RAVEN':
    case 'RAVEN_BOOK':
      return `Book${plural ? 's' : ''} of Ravens`
    case 'ELDER':
    case 'ELDER_BOOK':
      return `Book${plural ? 's' : ''} of Elders`
    case 'TEMPLE':
    case 'TEMPLE_BOOK':
      return `Book${plural ? 's' : ''} of Temples`
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
