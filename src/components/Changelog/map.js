import React from 'react'

const Buff = props => <span className='Changelog__buff'>{props.children}</span>
const Nerf = props => <span className='Changelog__nerf'>{props.children}</span>
const Info = props => <span className='Changelog__info'>{props.children}</span>
const Mixed = props => (
  <span className='Changelog__mixed'>{props.children}</span>
)

const END =
  '(?=$|,| \\(| and (?:{{)?(?=increased|decreased|lowered|reduced|adjusted|ability changed))' // | and (?:increased|decreased|lowered|reduced|adjusted)
const opt = (...value) => `(?:${value.join('\\s*')})?`
const re = (...chunks) => new RegExp(`(${chunks.join('\\s*')})${END}`, 'gi')
const oneOf = (...chunks) => `(?:${chunks.join('|')})`
const DECREASED = '(?:Decreased|Lowered|Reduced)'
const INCREASED = 'Increased'
const STRENGTH = 'strength'
const MANA = oneOf('mana', 'cost', 'mana cost')
const ABILITY = 'ability'
const MOVEMENT = 'movement'
const DAMAGE = 'damage'
const AND = 'and'
const FROM = 'from'
const REQUIREMENTS = 'requirements?'
const LEVELS = oneOf(
  'leveling',
  'when leveling',
  'when leveled',
  'at max level',
  'at higher levels?',
  'at lower levels',
  'at level 5'
)
const BY_INT = 'by \\d+'
const TO_INT = 'to \\d+'

const MOOD_MAP = new Map([
  // Info
  [re('Added', oneOf('to', 'in'), 'Brawl mode'), Info],
  [re('Added to the game'), Info],
  [re('Made available in the Shop'), Info],
  [re('Made available to be crafted and randomly collected'), Info],

  // Strength
  [re(DECREASED, STRENGTH, opt('given'), opt('from ability'), BY_INT), Nerf],
  [re(DECREASED, STRENGTH), Nerf],
  [re(DECREASED, STRENGTH, BY_INT), Nerf],
  [re(DECREASED, STRENGTH, opt('and that of spawned units'), LEVELS), Nerf],
  [re(DECREASED, STRENGTH, BY_INT, LEVELS), Nerf],
  [re(DECREASED, STRENGTH, LEVELS, BY_INT), Nerf],
  [re(INCREASED, STRENGTH), Buff],
  [
    re(
      INCREASED,
      STRENGTH,
      oneOf('given to others', 'of spawned dragons'),
      BY_INT,
      LEVELS
    ),
    Buff,
  ],
  [re(INCREASED, STRENGTH, 'of the spawned units', BY_INT), Buff],
  [re(INCREASED, STRENGTH, LEVELS), Buff],
  [re(INCREASED, STRENGTH, opt('given'), opt('from ability'), BY_INT), Buff],
  [re(INCREASED, opt('bonus'), STRENGTH, BY_INT), Buff],
  [re(INCREASED, opt('initial'), STRENGTH, BY_INT), Buff],
  [re(INCREASED, STRENGTH, LEVELS, BY_INT), Buff],
  [re(INCREASED, STRENGTH, BY_INT, LEVELS), Buff],

  // Mana
  [re('costs \\d+ more', LEVELS), Nerf],
  [re(DECREASED, MANA, opt('and spawns'), LEVELS), Mixed],
  [re(DECREASED, MANA, 'gained', FROM, ABILITY, BY_INT), Nerf],
  [re(DECREASED, MANA, TO_INT), Buff],
  [re(DECREASED, MANA, BY_INT), Buff],
  [re(INCREASED, MANA, BY_INT), Nerf],
  [re(INCREASED, MANA, BY_INT, AND, MANA, FROM, ABILITY, BY_INT), Mixed],

  // Ability
  [re(ABILITY, 'increased', LEVELS, AND, 'decreased', LEVELS), Mixed],
  [re(ABILITY, 'changed'), Mixed],
  [re(ABILITY, 'also works on friendly units'), Buff],
  [re(ABILITY, 'only hits friendly units'), Nerf],
  [re(DECREASED, ABILITY, BY_INT), Nerf],
  [re(DECREASED, opt('\\(negative)\\'), ABILITY, BY_INT), Buff],
  [re(DECREASED, ABILITY, LEVELS), Nerf],
  [re(DECREASED, ABILITY, STRENGTH), Nerf],
  [re(DECREASED, STRENGTH, FROM, ABILITY), Nerf],
  [re(INCREASED, ABILITY), Buff],
  [re(INCREASED, opt('drain'), ABILITY, BY_INT), Buff],
  [re(INCREASED, ABILITY, BY_INT, LEVELS), Buff],
  [re(INCREASED, ABILITY, BY_INT, LEVELS), Buff],
  [re(INCREASED, ABILITY, DAMAGE), Buff],
  [re(INCREASED, ABILITY, DAMAGE, LEVELS), Buff],
  [re(INCREASED, ABILITY, DAMAGE, BY_INT), Buff],
  [re(INCREASED, ABILITY, LEVELS, BY_INT), Buff],
  [re(INCREASED, ABILITY, LEVELS), Buff],
  [re(INCREASED, ABILITY, STRENGTH, BY_INT), Buff],
  [re(INCREASED, 'all possible abilities', BY_INT), Buff],

  // Movement
  [re(DECREASED, MOVEMENT, BY_INT), Nerf],
  [re(DECREASED, MOVEMENT, TO_INT), Nerf],
  [re(INCREASED, MOVEMENT, TO_INT), Buff],

  // Damage
  [re(DECREASED, opt('maximum'), DAMAGE, BY_INT), Nerf],
  [re(INCREASED, opt('maximum'), DAMAGE, opt('and spawn'), BY_INT), Buff],
  [re(INCREASED, opt('maximum'), DAMAGE, opt('done'), BY_INT), Buff],
  [re(INCREASED, DAMAGE, LEVELS), Buff],

  // Mana and strength
  [re(DECREASED, MANA, AND, STRENGTH, opt('given'), BY_INT), Mixed],
  [re(DECREASED, MANA, AND, STRENGTH, LEVELS, BY_INT), Mixed],
  [re(DECREASED, MANA, BY_INT, AND, STRENGTH, LEVELS, BY_INT), Mixed],
  [re(DECREASED, STRENGTH, AND, MANA, BY_INT), Mixed],
  [re(INCREASED, STRENGTH, AND, MANA, BY_INT), Mixed],
  [re(INCREASED, MANA, opt(BY_INT), AND, STRENGTH, BY_INT), Mixed],
  [
    re(
      INCREASED,
      MANA,
      opt(BY_INT),
      AND,
      STRENGTH,
      opt('of spawned units'),
      BY_INT
    ),
    Mixed,
  ],

  // Mana, strength and ability
  [re(INCREASED, MANA, ',', STRENGTH, AND, ABILITY, BY_INT), Mixed],
  [re(DECREASED, MANA, ',', STRENGTH, AND, ABILITY, BY_INT), Mixed],

  // Mana and damage
  [
    re(INCREASED, MANA, opt(BY_INT), AND, opt('additional'), DAMAGE, BY_INT),
    Mixed,
  ],

  // Mana and movement
  [re(INCREASED, MANA, AND, MOVEMENT, BY_INT), Mixed],

  // Mana and ability
  [
    re(INCREASED, MANA, opt(BY_INT), AND, ABILITY, opt('damage'), BY_INT),
    Mixed,
  ],
  [re(DECREASED, MANA, opt(BY_INT), AND, ABILITY, BY_INT), Mixed],

  // Strength requirements
  [re(DECREASED, STRENGTH, REQUIREMENTS, BY_INT), Buff],
  [re(DECREASED, MANA, AND, STRENGTH, REQUIREMENTS, BY_INT), Buff],
  [re(INCREASED, MANA, AND, 'maximum', STRENGTH, REQUIREMENTS, BY_INT), Nerf],
  [re(INCREASED, opt('max'), STRENGTH, REQUIREMENTS, BY_INT), Nerf],

  // Strength and ability
  [re(DECREASED, STRENGTH, AND, '\\(negative\\)', ABILITY, BY_INT), Mixed],
  [re(DECREASED, STRENGTH, AND, ABILITY), Nerf],
  [re(DECREASED, STRENGTH, AND, ABILITY, BY_INT), Nerf],
  [re(DECREASED, STRENGTH, AND, ABILITY, LEVELS), Nerf],
  [re(DECREASED, STRENGTH, AND, ABILITY, DAMAGE, BY_INT), Nerf],
  [re(INCREASED, ABILITY, BY_INT, AND, STRENGTH, BY_INT, LEVELS), Buff],
  [re(INCREASED, STRENGTH, AND, ABILITY, LEVELS), Buff],
  [re(INCREASED, STRENGTH, AND, ABILITY, BY_INT), Buff],
  [re(INCREASED, STRENGTH, AND, ABILITY, LEVELS, BY_INT), Buff],
  [re(INCREASED, STRENGTH, AND, ABILITY, BY_INT, LEVELS), Buff],

  // Strength and damage
  [re(INCREASED, STRENGTH, AND, DAMAGE, LEVELS, BY_INT), Buff],
])

export default MOOD_MAP
