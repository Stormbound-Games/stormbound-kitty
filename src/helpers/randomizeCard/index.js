import arrayRandom from '~/helpers/arrayRandom'
import random from '~/helpers/random'
import { RACES, BASE_SLOTS, FACTION_SLOTS, NAMES, STAT_LINES } from './data'
import { MIN_MANA, MAX_MANA, MAX_EFF_COST, filters } from './constants'
import { log } from './utils'

class Card {
  constructor() {
    this.mana = 0
    this.effCost = 0
    this.effCostMult = 0
    this.strength = 0
    this.movement = 0
    this.race = ''
    this.subrace = ''
    this.faction = ''
    this.ability = ''
    this.rarity = ''
    this.firstName = 'Random'
    this.lastName = 'unit'
  }

  generate() {
    while (true) {
      this.ability = ''
      this.effCostMult = 0
      this.effCost = 0
      this.subrace = ''

      this.getRace()
      this.getEffect()
      this.getStatline()

      const sum = this.mana + this.effCost
      const reroll =
        sum < MIN_MANA ||
        sum > MAX_MANA ||
        this.effCost > MAX_EFF_COST ||
        (sum > 6 && this.effCost < 2) ||
        (this.trigger === 1 &&
          (this.ability.includes('stronger') ||
            this.ability.includes('weaker')))

      if (!reroll) break
      log('Rerolling effect\n')
    }

    this.defineName()
  }

  getRace() {
    this.race = arrayRandom(RACES)
    this.faction = this.race.faction
    if (filters.faction !== '' && this.faction !== filters.faction)
      this.getRace()
    if (filters.race !== '' && this.race.name !== filters.race) this.getRace()
  }

  getStatline() {
    while (true) {
      this.mana = random(2, 9)
      this.movement = arrayRandom(this.race.movementRange)
      this.strength = STAT_LINES[this.movement][this.mana - 2]
      log(`Base statline: ${this.mana}`)
      if (this.strength > (this.subrace === 'elder' ? 3 : 0)) break
      log('Rerolling statline')
    }
  }

  getEffect() {
    let effectText = ''

    while (true) {
      this.trigger = arrayRandom([0, 1, 2, 3, 4])
      this.subrace = ''
      // 0: On play
      // 1: On death
      // 2: Before attacking
      // 3: After surviving damage
      // 4: Before moving
      this.effCostMult = [0.75, 0.75, 1, 1.5, 1.75][this.trigger]
      this.ability = [
        'On play, ',
        'On death, ',
        'Before attacking, ',
        'After surviving damage, ',
        'Before moving, ',
      ][this.trigger]

      if (this.movement === 0 && this.trigger > 1) this.effCostMult -= 0.5
      if (this.trigger === 3) this.subrace = 'elder'
      if (this.trigger === 4) this.subrace = 'ancient'

      effectText = arrayRandom(this.race.abilities)
      if (random(1, 3) <= effectText.valid[this.trigger]) break
    }

    this.ability += effectText.desc
    this.effCost = effectText.cost

    log(`Base effect cost: ${this.effCost}`)

    this.effCost *= this.effCostMult

    log(
      `Adding trigger multiplier of ${this.effCostMult}. New cost: ${this.effCost}`
    )

    // Conditional triggers:
    if (this.ability.includes('On play') && random(1, 3) === 1) {
      const token = this.race.name === 'pirate' ? 'pirateCondPlay' : 'condPlay'
      this.ability = this.ability.replace('On play', `{${token}}`)
    }

    if (this.ability.includes('Before attacking') && random(1, 3) === 1) {
      this.ability = this.ability.replace('Before attacking', '{condAttack}')
    }

    this.fillSlots()

    // Unique cases:
    if (
      this.ability.includes(' it') &&
      this.ability.includes('units') &&
      !this.ability.includes('itself')
    ) {
      this.ability = this.ability.replaceAll(' it', ' them')
    }

    if (this.ability.includes('poison ') && this.ability.includes('poisoned')) {
      this.ability = this.ability.replaceAll(' poisoned ', ' ')
    }

    if (this.ability.includes('freeze ') && this.ability.includes('frozen')) {
      this.ability = this.ability.replaceAll(' frozen ', ' ')
    }

    if (
      this.race.name === 'construct' &&
      this.ability.includes('unit') &&
      random(1, 2) === 1
    ) {
      this.ability =
        this.ability.slice(0, this.ability.indexOf(',')) +
        this.ability
          .slice(this.ability.indexOf(','))
          .replaceAll('unit', 'Construct')
      this.effCost *= 0.5

      log(`Adding Construct-only multiplier of 0.5. New cost: ${this.effCost}`)
    }

    if (
      this.race.name === 'satyr' &&
      this.ability.includes('unit') &&
      random(1, 3) !== 1
    ) {
      const pivot = this.ability.indexOf(',')
      this.effCost *= 0.5
      this.ability =
        this.ability.slice(0, pivot) +
        this.ability.slice(pivot).replaceAll('unit', 'Satyr')

      log(`Adding Satyr-only multiplier of 0.5. New cost: ${this.effCost}`)
    }

    this.rarity = 'epic'
    if (this.effCost % 1 < 0.66) this.rarity = 'rare'
    if (this.effCost % 1 < 0.33) this.rarity = 'common'
  }

  fillSlots() {
    while (true) {
      const [, target] = this.ability.match(/{([^}]+)}/) || []

      if (!target) return

      const matchesTarget = slot => slot.type === target
      const validSlots = BASE_SLOTS.filter(matchesTarget)

      if (this.faction in FACTION_SLOTS) {
        validSlots.push(...FACTION_SLOTS[this.faction].filter(matchesTarget))
      }

      const targetSlot = arrayRandom(validSlots)

      this.effCost *= targetSlot.cost
      this.ability = this.ability
        .replace('{' + target + '}', targetSlot.part1)
        .replace('{' + target + '2}', targetSlot.part2)

      log(
        `Adding ${target} multiplier of ${targetSlot.cost}. New cost: ${this.effCost}`
      )
    }
  }

  defineName() {
    const [firstNames, lastNames] = NAMES[this.race.name]

    this.firstName = arrayRandom(firstNames)
    this.lastName = arrayRandom(lastNames)
  }

  getImageID() {
    const imageKey = [
      'construct',
      'frostling',
      'knight',
      'pirate',
      'raven',
      'rodent',
      'satyr',
      'toad',
      'undead',
      'dwarf',
      'dragon',
      null,
      'feline',
    ]

    const index = imageKey.indexOf(this.race.name)

    return index === -1 ? 'T3' : 'T' + (index + 1)
  }

  toObject() {
    return {
      type: 'unit',
      race: this.race.name,
      rarity: this.rarity,
      faction: this.faction,
      name: this.firstName + ' ' + this.lastName,
      mana: (this.mana + Math.floor(this.effCost)).toString(),
      strength: this.strength.toString(),
      movement: this.movement.toString(),
      ability: this.ability,
      imageCardId: this.getImageID(),
      ancient: this.subrace === 'ancient',
      elder: this.subrace === 'elder',
    }
  }
}

const randomizeCard = () => {
  const card = new Card()

  card.generate()

  return card.toObject()
}

export default randomizeCard
