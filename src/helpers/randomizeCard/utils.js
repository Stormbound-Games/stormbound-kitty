import { VERBOSE } from './constants'

export function log(...message) {
  if (VERBOSE) console.log(...message)
}

// @TODO: better describe what kind of wording issues this fixes.
export function fixWording(ability) {
  if (
    ability.includes(' it') &&
    (ability.includes('[unit]s') || ability.includes('tiles')) &&
    !ability.includes('itself')
  ) {
    ability = ability.replaceAll(' it', ' them')
  }

  if (ability.includes('poison ') && ability.includes('poisoned')) {
    ability = ability.replaceAll(' poisoned ', ' ')
  }

  if (ability.includes('freeze ') && ability.includes('frozen')) {
    ability = ability.replaceAll(' frozen ', ' ')
  }

  if (ability.includes(' frozen ') && ability.includes('friendly')) {
    ability = ability.replaceAll(' frozen  ', ' ')
  }

  ability = ability
    .replaceAll('them has', 'they have')
    .replaceAll('them dies', 'they die')
    .replaceAll('thems', 'their')

  return ability
}

export class Race {
  constructor(name, faction, movementRange = [0]) {
    this.name = name
    this.faction = faction
    this.movementRange = movementRange
    this.abilities = []
  }

  addEffects(effects = []) {
    this.abilities.push(...effects)
  }
}

export class Effect {
  constructor(description, valid, cost) {
    this.description = description
    // The `.valid` key holds an array of 5 items representing the triggers in
    // their definition order (see `TRIGGERS`), and whether that effect is valid
    // for each trigger.
    // - `0` means the effect is invalid for that specific trigger, for instance
    // “On death, gain X strength”.
    // - `3` means the effect is valid for that specific trigger and will be
    // chosen.
    // - `1` means the effect is possible for that specific effect.
    this.valid = valid
    // The `.cast` key does not hold a mana cost. It’s an arbitrary measurement
    // value from which the card rarity gets derivated.
    this.cost = cost
  }
}

export class Slot {
  constructor(type, part1, part2, cost) {
    this.type = type
    this.part1 = part1
    this.part2 = part2
    this.cost = cost
  }
}
