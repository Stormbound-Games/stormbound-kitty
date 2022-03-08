const handleSearchAlias = term => {
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
      return ['tags', [{ name: 'High Levels', slug: 'HIGH_LEVELS' }]]
    case 'equal':
    case 'tournament':
    case 'tourney':
      return ['tags', [{ name: 'Equals', slug: 'EQUALS' }]]
    case 'casual':
    case 'warrior':
    case 'ultimate':
      return ['tags', [{ name: 'Brawl', slug: 'BRAWL' }]]
    case 'toad':
    case 'toads':
      return ['tags', [{ name: 'Freedom Fight', slug: 'TOAD_MANA' }]]
    case 'dwarf':
    case 'dwarves':
      return ['tags', [{ name: 'Natural Sprint', slug: 'DWARF_MANA' }]]
    case 'pirate':
    case 'pirates':
      return ['tags', [{ name: 'Pirate Treasure', slug: 'PIRATE_MANA' }]]
    case 'raven':
    case 'ravens':
      return ['tags', [{ name: 'Scavengers', slug: 'RAVEN_MOVEMENT' }]]
    case 'rodent':
    case 'rodents':
      return ['tags', [{ name: 'Small Plague', slug: 'RODENT_STRENGTH' }]]
    case 'feline':
    case 'felines':
      return ['tags', [{ name: 'Noble Coalition', slug: 'FELINE_STRENGTH' }]]
    case 'satyr':
    case 'satyrs':
      return ['tags', [{ name: 'Self-Control', slug: 'SATYR_MOVEMENT' }]]
    case 'spell':
    case 'spells':
      return ['tags', [{ name: 'Eye of the Tempest', slug: 'SPELL_MANA' }]]
    case 'frostling':
    case 'frostlings':
      return ['tags', [{ name: 'Goddess Boon', slug: 'FROSTLING_STRENGTH' }]]
    case 'elder':
    case 'elders':
      return ['tags', [{ name: 'Elderly Wisdom', slug: 'ELDER_STRENGTH' }]]
    case 'construct':
    case 'constructs':
      return [
        'tags',
        [{ name: 'Lucrative Movement', slug: 'CONSTRUCT_MOVEMENT' }],
      ]
    case 'knight':
    case 'knights':
      return ['tags', [{ name: 'Heavy Metal', slug: 'KNIGHT_MANA' }]]
    case 'dragon':
    case 'dragons':
      return ['tags', [{ name: 'Unleashed Fury', slug: 'DRAGON_MOVEMENT' }]]
    case 'undead':
      return ['tags', [{ name: 'Swift Demise', slug: 'UNDEAD_STRENGTH' }]]
    case 'hero':
      return ['tags', [{ name: 'Heroic Deeds', slug: 'HERO_STRENGTH' }]]
    case 'amal':
    case 'amalgamation':
    case 'pa':
      return [
        'tags',
        [{ name: 'Pure Almagamation', slug: 'PURE_AMALGAMATION' }],
      ]
    case 'fot':
    case 'fight':
    case 'threes':
      return ['tags', [{ name: 'Fights of Threes', slug: 'FIGHTS_OF_THREES' }]]
    case 'tnml':
    case 'land':
      return [
        'tags',
        [{ name: 'Thin No Man’s Land', slug: 'THIN_NO_MANS_LAND' }],
      ]
    case 'sa':
    case 'stunning':
      return ['tags', [{ name: 'Stunning Attack', slug: 'STUNNING_ATTACK' }]]
    default:
      return []
  }
}

export default handleSearchAlias
