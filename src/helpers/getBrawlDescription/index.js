const getBrawlDescription = id => {
  switch (id) {
    case 'DWARF_MANA':
      return 'All *Dwarf* units cost *-2 mana* from their initial mana cost, for a minimum of 0.'
    case 'PIRATE_MANA':
      return 'All *Pirate* units cost *-2 mana* from their initial mana cost, for a minimum of 0.'
    case 'RAVEN_MOVEMENT':
      return 'All *Raven* units benefit from an extra *+1 movement* on top of their initial movement.'
    case 'STRUCTURE_MANA':
      return 'All *structures* cost *2 mana*, regardless of their initial mana cost.'
    case 'RODENT_STRENGTH':
      return 'All *Rodent* units benefit from an extra *+3 strength* on top of their initial strength.'
    case 'PIRATE_MOVEMENT':
      return 'All *Pirate* units have *2 movement*, regardless of their initial movement.'
    case 'FELINE_STRENGTH':
      return 'All *Feline* units benefit from an extra *+2 strength* on top of their initial strength.'
    case 'SATYR_MOVEMENT':
      return 'All *Satyr* units benefit from an extra *+1 movement* on top of their initial movement.'
    case 'SPELL_MANA':
      return 'All *spells* cost *-2 mana* from their initial mana cost, for a minimum of 0.'
    case 'FROSTLING_STRENGTH':
      return 'All *Frostling* units benefit from an extra *+4 strength* on top of their initial strength.'
    case 'TOAD_MANA':
      return 'All *Toad* units cost *2 mana*, regardless of their initial mana cost.'
    case 'ELDER_STRENGTH':
      return 'All *Elder* units benefit from an extra *+3 strength* on top of their initial strength.'
    case 'CONSTRUCT_MOVEMENT':
      return 'All *Construct* units have *2 movement*, regardless of their initial movement.'
    case 'KNIGHT_MANA':
      return 'All *Knight* units cost *-2 mana* from their initial mana cost, for a minimum of 0.'
    case 'DRAGON_MOVEMENT':
      return 'All *Dragon* units benefit from an extra *+1 movement* on top of their initial movement.'
    case 'UNDEAD_STRENGTH':
      return 'All *Undead* units benefit from an extra *+2 strength* on top of their initial strength.'
    case 'HERO_STRENGTH':
      return 'All *Hero* units benefit from an extra *+3 strength* on top of their initial strength.'
    case 'PURE_AMALGAMATION':
      return 'Both players use the same deck randomly made of 6 cards of each player’s initial deck.'
    case 'FIGHTS_OF_THREES':
      return 'There cannot be more than 3 friendly units on the board at all time.'
    case 'THIN_NO_MANS_LAND':
      return 'The frontline starts at and cannot be lower than the second row.'
    case 'STUNNING_ATTACK':
      return 'Units get confused on receiving any damage.'
    default:
      return null
  }
}

export default getBrawlDescription
