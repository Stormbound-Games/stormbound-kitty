import React from 'react'

const Buff = props => <span className='Changelog__buff'>{props.children}</span>
const Nerf = props => <span className='Changelog__nerf'>{props.children}</span>
const Info = props => <span className='Changelog__info'>{props.children}</span>
const Mixed = props => (
  <span className='Changelog__mixed'>{props.children}</span>
)

const END =
  '(?=$|,|;| \\(| and (?:{{)?(?=increased|decreased|lowered|reduced|adjusted|ability changed|changed))'
const join = (...chunks) => chunks.join('\\s*')
const opt = (...chunks) => `(?:${join(...chunks)})?`
const re = (...chunks) => new RegExp(`(${join(...chunks)})${END}`, 'gi')
const oneOf = (...chunks) => `(?:${chunks.join('|')})`
const parens = (...chunks) => `\\(${join(...chunks)}\\)`
const DECREASED = '(?:Decreased|Lowered|Reduced)'
const INCREASED = '(?:Increased|Doubled)'
const REMOVED = 'Removed'
const FIXED = 'Fixed'
const STRENGTH = 'strength'
const MANA = oneOf('mana', 'cost', 'mana cost')
const ABILITY = 'ability'
const MOVEMENT = 'movement'
const DAMAGE = 'damage'
const AND = 'and'
const FROM = 'from'
const REQUIREMENTS = 'requirements?'
const LEVELS = oneOf(
  '(?:when )?level(?:ing|ed)',
  'at (?:higher|lower|other) levels?',
  'at max level',
  'at level \\d'
)
const BY_INT = 'by \\d+'
const TO_INT = 'to \\d+'
const LEVELS_AND_OR_BY_INT = oneOf(
  join(opt(LEVELS), BY_INT),
  join(opt(BY_INT), LEVELS),
  ''
)

const MOOD_MAP = new Map([
  // Info
  [
    re('Added', oneOf(join(oneOf('to', 'in'), 'Brawl mode'), 'to the game')),
    Info,
  ],
  [
    re(
      'Made available',
      oneOf('in the Shop', 'to be crafted and randomly collected')
    ),
    Info,
  ],

  // Strength
  [
    re(
      DECREASED,
      STRENGTH,
      opt('given'),
      opt('from ability'),
      opt('and that of spawned units'),
      LEVELS_AND_OR_BY_INT
    ),
    Nerf,
  ],
  [
    re(
      INCREASED,
      opt('bonus'),
      opt('initial'),
      STRENGTH,
      opt('given', opt('to others')),
      opt('from ability'),
      opt('of(?: the)? spawn(?:ed)?(?: units| dragons)?'),
      LEVELS_AND_OR_BY_INT
    ),
    Buff,
  ],
  [re(FIXED, STRENGTH, LEVELS), Mixed],

  // Mana
  [re('costs \\d+ more', LEVELS), Nerf],
  [re(DECREASED, MANA, opt('and spawns'), LEVELS), Mixed],
  [
    re(
      DECREASED,
      MANA,
      opt('gained', FROM, ABILITY),
      oneOf(join(BY_INT, opt(parens(TO_INT, MANA))), TO_INT)
    ),
    Buff,
  ],
  [
    re(
      INCREASED,
      MANA,
      opt('gained', FROM, ABILITY),
      oneOf(join(BY_INT, opt(parens(TO_INT, MANA))), TO_INT)
    ),
    Nerf,
  ],
  [re(INCREASED, MANA, BY_INT, AND, MANA, FROM, ABILITY, BY_INT), Mixed],

  // Ability
  [
    re(
      ABILITY,
      oneOf('increased', 'changed'),
      opt(LEVELS, AND, 'decreased', LEVELS)
    ),
    Mixed,
  ],
  [re(ABILITY, 'also works on friendly units'), Buff],
  [re(ABILITY, 'only hits friendly units'), Nerf],
  [re(DECREASED, opt(parens('negative')), ABILITY, BY_INT), Buff],
  [
    re(
      DECREASED,
      opt(STRENGTH, FROM),
      ABILITY,
      opt(STRENGTH),
      LEVELS_AND_OR_BY_INT
    ),
    Nerf,
  ],
  [
    re(
      INCREASED,
      oneOf(
        join(opt('drain'), ABILITY, opt(STRENGTH), opt(DAMAGE)),
        'all possible abilities'
      ),
      LEVELS_AND_OR_BY_INT
    ),
    Buff,
  ],

  // Movement
  [re('Set', MOVEMENT, oneOf(BY_INT, TO_INT)), Mixed],
  [re(DECREASED, MOVEMENT, oneOf(BY_INT, TO_INT)), Nerf],
  [re(INCREASED, MOVEMENT, oneOf(BY_INT, TO_INT)), Buff],

  // Damage
  [
    re(
      DECREASED,
      opt('maximum'),
      DAMAGE,
      opt('and spawn'),
      opt('done'),
      oneOf(join(opt(LEVELS), BY_INT), join(opt(BY_INT), LEVELS))
    ),
    Nerf,
  ],
  [
    re(
      INCREASED,
      opt('maximum'),
      DAMAGE,
      opt('and spawn'),
      opt('done'),
      LEVELS_AND_OR_BY_INT
    ),
    Buff,
  ],

  // Mana, strength and ability
  [
    re(oneOf(INCREASED, DECREASED), MANA, ',', STRENGTH, AND, ABILITY, BY_INT),
    Mixed,
  ],

  // Mana and strength
  [
    re(
      oneOf(DECREASED, INCREASED),
      oneOf(
        join(MANA, opt(BY_INT), AND, STRENGTH),
        join(STRENGTH, opt(BY_INT), AND, MANA)
      ),
      opt('given'),
      opt('of spawned units'),
      LEVELS_AND_OR_BY_INT
    ),
    Mixed,
  ],

  // Mana and ability, damage or movement
  [
    re(
      oneOf(DECREASED, INCREASED),
      MANA,
      opt(BY_INT),
      AND,
      oneOf(
        join(ABILITY, opt('damage')),
        join(opt('additional'), DAMAGE),
        MOVEMENT
      ),
      BY_INT
    ),
    Mixed,
  ],

  // Strength requirements
  [re(DECREASED, opt(MANA, AND), STRENGTH, REQUIREMENTS, BY_INT), Buff],
  [
    re(
      INCREASED,
      oneOf(join(MANA, AND, 'maximum'), opt('max')),
      STRENGTH,
      REQUIREMENTS,
      BY_INT
    ),
    Nerf,
  ],

  // Strength and ability
  [
    re(DECREASED, STRENGTH, AND, opt(parens('negative')), ABILITY, BY_INT),
    Mixed,
  ],
  [
    re(
      DECREASED,
      oneOf(
        join(ABILITY, opt(BY_INT), AND, STRENGTH),
        join(STRENGTH, opt(BY_INT), AND, ABILITY)
      ),
      opt(DAMAGE),
      LEVELS_AND_OR_BY_INT
    ),
    Nerf,
  ],
  [
    re(
      INCREASED,
      oneOf(
        join(ABILITY, opt(BY_INT), AND, STRENGTH),
        join(STRENGTH, opt(BY_INT), AND, ABILITY)
      ),
      opt(DAMAGE),
      LEVELS_AND_OR_BY_INT
    ),
    Buff,
  ],

  // Strength and damage
  [
    re(INCREASED, STRENGTH, opt(LEVELS), AND, DAMAGE, LEVELS, opt(BY_INT)),
    Buff,
  ],

  // Misc
  [re('Reworked'), Mixed],
  [re('changed leveling steps'), Mixed],
  [re(REMOVED, oneOf(DAMAGE, 'card draw')), Nerf],
])

export default MOOD_MAP
