import React from 'react'

const Buff = props => <span className='Changelog__buff'>{props.children}</span>
const Nerf = props => <span className='Changelog__nerf'>{props.children}</span>
const Info = props => <span className='Changelog__info'>{props.children}</span>
const Mixed = props => (
  <span className='Changelog__mixed'>{props.children}</span>
)

const END =
  '(?=$|,|;| \\(| and (?:{{)?(?=increased|decreased|lowered|reduced|adjusted|ability changed|changed))'

/**
 * Join multiple parts together by 0 to many spaces. In theory, it would be
 * to join by at least a space, or strictly a space, but in practice it’s more
 * composable this way, and doesn’t make much of a difference.
 * @param {...String} chunks - Parts to join together
 * @return {String}
 * @example
 * join('a', 'b') -> 'a\\s*b'
 */
const join = (...chunks) => chunks.join('\\s*')

/**
 * Join multiple parts together and mark the result as optional.
 * @param {...String} chunks - Parts to mark optional
 * @return {String}
 * @example
 * opt('a', 'b') -> '(?:a\\s*b)?'
 */
const opt = (...chunks) => `(?:${join(...chunks)})?`

/**
 * Create a dynamic global case-insensitive regular expression from multiple
 * parts joined together, scoped until the end of line, a comma, semi-colon, or
 * the beginning of another segment.
 * @param {...String} chunks - Parts to mark optional
 * @return {RegExp}
 */
const re = (...chunks) => new RegExp(`(${join(...chunks)})${END}`, 'gi')

/**
 * Join multiple parts together and mark the result as required one of them
 * to match.
 * @param {...String} chunks - Parts to mark optional
 * @return {String}
 * @example
 * oneOf('a', 'b') -> '(?:a|b)'
 */
const oneOf = (...chunks) => `(?:${chunks.join('|')})`

/**
 * Join multiple parts together and wrap the result in parentheses, which will
 * be escaped as part of the end regular expression.
 * to match.
 * @param {...String} chunks - Parts to mark optional
 * @return {String}
 * @example
 * oneOf('a', 'negative') -> '\\(a\\s*negative\\)'
 */
const parens = (...chunks) => `\\(${join(...chunks)}\\)`

// All verbs indicating a decrease of any kind. Note that it doesn’t necessarily
// translate into a nerf though: a mana reduction would be a buff.
const DECREASED = oneOf('Decreased', 'Lowered', 'Reduced')

// All verbs indicating an increase of any kind. Note that it does not
// necessarily translate into a buff though: a mana increase would be a nerf.
const INCREASED = oneOf('Increased', 'Doubled')

// Verb indicating a removal of some sort.
const REMOVED = 'Removed'

// Verb indicating a fix of some sort.
const FIXED = oneOf('Fixed', 'Set')

// Mana is authored in different ways, either “mana”, “cost” or “mana cost”.
const MANA = oneOf('mana', 'cost', 'mana cost')

// Common terms for changes.
const STRENGTH = 'strength'
const ABILITY = 'ability'
const MOVEMENT = 'movement'
const DAMAGE = 'damage'
const REQUIREMENTS = 'requirements?'

// Joints.
const AND = 'and'
const FROM = 'from'

// The concept of levels is loose and varies depending on the type of change.
// E.g. “when leveled”, “when leveling”, “leveling”, “at higher levels”, “at
// lower levels”, “at other levels”, “at max level”, “at level x”, “on all
// levels”, “for all levels”.
const LEVELS = oneOf(
  '(?:when )?level(?:ing|ed)',
  'at (?:higher|lower|other) levels?',
  'at max level',
  'at level \\d',
  '(?:on|for) all levels'
)

const BY_INT = 'by \\d+'
const TO_INT = 'to \\d+'

// Most changes ends with either:
// - a level indication (see `LEVELS`)
// - a numeric update (see `BY_INT`)
// - a level indication then a numeric update (e.g. “at higher levels by 2”)
// - a numeric update then a level indication (e.g. “by 2 at higher levels”)
// - none of these
// Thus it is convenient to group these possible ends in a single constant so it
// can be reused.
const LEVELS_AND_OR_BY_INT = oneOf(
  join(opt(LEVELS), BY_INT),
  join(opt(BY_INT), LEVELS),
  ''
)

const MOOD_MAP = new Map([
  // Generic information
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
  [
    re(FIXED, STRENGTH, oneOf(join(LEVELS, opt(TO_INT)), join(TO_INT, LEVELS))),
    Mixed,
  ],

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
  [re(FIXED, ABILITY, TO_INT, LEVELS), Mixed],

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

console.log(MOOD_MAP.keys())

export default MOOD_MAP
