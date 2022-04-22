import { VERBOSE } from './constants'

export class Race {
  constructor(name, faction, movementRange) {
    this.name = name
    this.faction = faction
    this.movementRange = movementRange
    this.abilities = []
  }

  addEffect(effect) {
    this.abilities.push(effect)
  }
}

export class Effect {
  constructor(description, valid, cost) {
    this.desc = description
    this.valid = valid
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

export function log(...message) {
  if (VERBOSE) console.log(...message)
}
