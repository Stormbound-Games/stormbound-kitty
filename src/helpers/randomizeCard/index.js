import arrayRandom from '~/helpers/arrayRandom'
import random from '~/helpers/random'

import {
  RACES,
  RACES_SPELLS,
  RACES_STRUCTURES,
  BASE_SLOTS,
  FACTION_SLOTS,
  NAMES,
  STATLINES_FAST,
  STATLINES_NONE,
  STATLINES_SLOW,
} from './data'
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
    this.lastName = 'card'
    this.type = 'Unit'
    this.strengthScaling = STATLINES_FAST
  }

  generate() {
    while (true) {
      this.ability = ''
      this.effCostMult = 0
      this.effCost = 0
      this.subrace = ''

      this.type = arrayRandom([
        'Unit',
        'Unit',
        'Unit',
        'Unit',
        'Unit',
        'Spell',
        'Spell',
        'Structure',
      ])

      this.getRace()
      this.getEffect()
      this.getStatline()

      if (this.type != 'Unit') this.movement = ''
      if (this.type == 'Spell') this.strength = ''

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
    if (this.type == 'Unit') this.race = arrayRandom(RACES)
    if (this.type == 'Spell') this.race = arrayRandom(RACES_SPELLS)
    if (this.type == 'Structure') this.race = arrayRandom(RACES_STRUCTURES)
    this.faction = this.race.faction
    if (filters.faction !== '' && this.faction !== filters.faction)
      this.getRace()
    if (filters.race !== '' && this.race.name !== filters.race) this.getRace()
  }

  getStatline() {
    if (this.type == 'Unit') {
      while (true) {
        this.mana = random(2, 9)
        this.movement = arrayRandom(this.race.movementRange)
        this.strength = this.strengthScaling[this.movement][this.mana - 2]
        log(`Base statline: ${this.mana}`)
        if (parseInt(this.strength) > (this.subrace === 'elder' ? 3 : 0)) break
        log('Rerolling statline')
      }
    }
    if (this.type == 'Structure') {
      this.mana = random(3, 5)
      this.strength = this.mana //Temporary logic, will implement better later
    }
  }

  getEffect() {
    let effectText = ''

    if (this.type == 'Unit') {
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
    } else {
      effectText = arrayRandom(this.race.abilities)
      this.effCostMult = 1
      if (this.type == 'Structure') {
        this.ability = 'At the start of your turn, '
      } else {
        this.ability = ''
      }
    }

    this.ability += effectText.desc
    if (this.type == 'Spell')
      this.ability = this.ability[0].toUpperCase() + this.ability.substring(1)

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
    if (this.ability.includes(`{target${this.type}}`) && random(1, 2) === 1) {
      console.log(`{target${this.type}}`)
      this.ability = this.ability.replace(`{target${this.type}}`, '{targetAny}')
      this.ability = this.ability.replace(
        `{target${this.type}2}`,
        '{targetAny2}'
      )
    }

    //Stat scaling
    this.strengthScaling = STATLINES_FAST
    if (this.ability.includes('{value}')) {
      let chance = random(1, 5)
      if (chance <= 1) {
        this.ability = this.ability.replace('{value}', '{valueNone}')
        this.strengthScaling = STATLINES_FAST
      } else if (chance <= 3) {
        this.ability = this.ability.replace('{value}', '{valueSlow}')
        this.strengthScaling = STATLINES_SLOW
      } else {
        this.ability = this.ability.replace('{value}', '{valueFast}')
        this.strengthScaling = STATLINES_NONE
      }
    }

    this.fillSlots()

    // Unique cases:
    if (
      this.ability.includes(' it') &&
      (this.ability.includes('[unit]s') || this.ability.includes('tiles')) &&
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
      this.ability.includes(' frozen ') &&
      this.ability.includes('friendly')
    ) {
      this.ability = this.ability.replaceAll(' frozen  ', ' ')
    }
    this.ability = this.ability.replaceAll('them has', 'they have')
    this.ability = this.ability.replaceAll('them dies', 'they die')
    this.ability = this.ability.replaceAll('thems', 'their')

    if (random(1, 2) == 1 && this.ability.includes('friendly')) {
      let replaceText = 'unit'
      if (this.race.name === 'construct') {
        replaceText = 'Construct'
      }
      if (this.race.name === 'satyr') {
        replaceText = 'Satyr'
      }
      if (replaceText != 'unit') {
        this.effCost *= 0.5
        log(`Adding specific unit multiplier of 0.5. New cost: ${this.effCost}`)
      }
      this.ability = this.ability.replaceAll('[unit]', replaceText)
    } else {
      this.ability = this.ability.replaceAll('[unit]', 'unit')
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
      const factionSlots = FACTION_SLOTS[this.faction] || []
      const allSlots = [...BASE_SLOTS, ...factionSlots]
      const validSlots = allSlots.filter(matchesTarget)
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
    if (this.type == 'Unit') {
      const [firstNames, lastNames] = NAMES[this.race.name]

      this.firstName = arrayRandom(firstNames)
      this.lastName = arrayRandom(lastNames)
      if (this.race.name == 'other') this.race.name = ''
    }
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

    if (this.type == 'Unit') {
      return index === -1 ? 'T3' : 'T' + (index + 1)
    } else if (this.type == 'Spell') {
      return 'N15'
    } else {
      return 'N13'
    }
  }

  toObject() {
    return {
      type: this.type.toLowerCase(),
      race: this.race.name,
      rarity: this.rarity,
      faction: this.faction,
      name:
        this.firstName +
        (this.race.name === 'dwarf' ? '' : ' ') +
        this.lastName,
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
