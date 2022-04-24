import { VERBOSE } from './constants'

export function log(...message) {
  if (VERBOSE) console.log(...message)
}

// @TODO: better describe what kind of wording issues this fixes.
export function fixWording(ability) {
  if (
    ability.includes(' it') &&
    (ability.includes('[unit]s') ||
      ability.includes('tiles') ||
      ability.includes('sides')) &&
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
    .replaceAll('them drains', 'they drain')
    .replaceAll('thems', 'their')

  return ability
}

// prettier-ignore
const VERBS = ['build', 'command', 'confuse', 'convert', 'deal', 'deconfuse', 'decrease', 'destroy', 'disable', 'drain', 'draw', 'explode', 'fly', 'force', 'freeze', 'gain', 'give', 'increase', 'jump', 'move', 'play', 'poison', 'pull', 'push', 'reduce', 'remember', 'remove', 'replace', 'restore', 'return', 'set', 'spawn', 'spend', 'split', 'teleport', 'trigger', 'vitalize']

export function highlight(ability) {
  return (
    ability
      // Highlight “bordering” and “surrounding” keywords.
      .replaceAll('bordering', '*bordering*')
      .replaceAll('surrounding', '*surrounding*')
      // Highlight all verbs, provided they are followed by a space. This avoids
      // highlighting “play” in “On play,” and, “poison” in “poisoned”, or “play”
      // in “played”.
      .replace(
        new RegExp(`(${VERBS.join('|')}) `, 'gi'),
        chunk => `*${chunk}* `
      )
      // In case a verb (represented in the following regular expression by a
      // closing highlighting star) is followed by a numeric value and a unit
      // (e.g. “* 5 damage”), move the highlight closure at the end of the whole
      // expression.
      //       /                            /    Regular expression delimiters
      //                                     gi  Global + case-insensitive flags
      //        \*                               Closing highlighting star
      //           (a )?                         Optional word “a” followed by
      //                                         a space to handle cases like
      //                                         “spawn a 1 strength unit”
      //                \d+                      At least one digit
      //                   ((\/\d+){4})?         Optional leveling values such
      //                                         as `/4/5/6/7`
      //                                 \w+     Following word
      .replace(/\* (a )?\d+((\/\d+){4})? \w+/gi, chunk => chunk.slice(1) + '*')
  )
}

export class Race {
  constructor(name, faction, image, movementRange = [0]) {
    this.name = name
    this.faction = faction
    this.movementRange = movementRange
    this.abilities = []
    this.image = image
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
    // The `.cost` is the base cost of the effect. It will get multiplied by the
    // costs of the effect's triggers and slots, then it will be added to the card's
    // statline cost in order to get the card's true mana cost.
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
