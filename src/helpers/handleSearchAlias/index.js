export default term => {
  switch (term.toLowerCase()) {
    case 'struct':
      return ['type', 'structure']
    case 'ic':
    case 'red':
      return ['faction', 'ironclad']
    case 'sf':
    case 'green':
      return ['faction', 'shadowfen']
    case 'w':
    case 'wp':
    case 'blue':
      return ['faction', 'winter']
    case 'sw':
    case 'yellow':
      return ['faction', 'swarm']
    case 'n':
    case 'grey':
    case 'gray':
      return ['faction', 'neutral']
    case 'd1': // legacy
    case 'hl':
    case 'heroes':
    case 'diamond':
      return ['tags', ['HIGH_LEVELS']]
    case 'equal':
    case 'tournament':
    case 'tourney':
      return ['tags', ['EQUALS']]
    case 'casual':
    case 'warrior':
    case 'ultimate':
      return ['tags', ['BRAWL']]
    case 'toad':
    case 'toads':
      return ['tags', ['TOAD_MANA']]
    case 'dwarf':
    case 'dwarves':
      return ['tags', ['DWARF_MANA']]
    case 'pirate':
    case 'pirates':
      return ['tags', ['PIRATE_MANA']]
    case 'raven':
    case 'ravens':
      return ['tags', ['RAVEN_MOVEMENT']]
    case 'rodent':
    case 'rodents':
      return ['tags', ['RODENT_STRENGTH']]
    case 'feline':
    case 'felines':
      return ['tags', ['FELINE_STRENGTH']]
    case 'satyr':
    case 'satyrs':
      return ['tags', ['SATYR_MOVEMENT']]
    case 'spell':
    case 'spells':
      return ['tags', ['SPELL_MANA']]
    case 'frostling':
    case 'frostlings':
      return ['tags', ['FROSTLING_STRENGTH']]
    case 'elder':
    case 'elders':
      return ['tags', ['ELDER_STRENGTH']]
    case 'construct':
    case 'constructs':
      return ['tags', ['CONSTRUCT_MOVEMENT']]
    case 'knight':
    case 'knights':
      return ['tags', ['KNIGHT_MANA']]
    case 'dragon':
    case 'dragons':
      return ['tags', ['DRAGON_MOVEMENT']]
    case 'undead':
      return ['tags', ['UNDEAD_STRENGTH']]
    case 'hero':
      return ['tags', ['HERO_STRENGTH']]
    case 'amal':
    case 'amalgamation':
    case 'pa':
      return ['tags', ['PURE_AMALGAMATION']]
    case 'fot':
    case 'fight':
    case 'threes':
      return ['tags', ['FIGHTS_OF_THREES']]
    case 'tnml':
    case 'land':
      return ['tags', ['THIN_NO_MANS_LAND']]
    case 'sa':
    case 'stunning':
      return ['tags', ['STUNNING_ATTACK']]
    default:
      return []
  }
}
