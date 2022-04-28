import rwc from 'random-weighted-choice'
import arrayRandom from '~/helpers/arrayRandom'
import random from '~/helpers/random'
import capitalize from '~/helpers/capitalize'
import { FACTIONS, TYPES } from '~/constants/game'
import {
  RACES_BY_TYPE,
  BASE_SLOTS,
  FACTION_SLOTS,
  NAMES,
  STATLINES_FAST,
  STATLINES_NONE,
  STATLINES_SLOW,
  TRIGGERS,
} from './data'
import { MIN_MANA, MAX_MANA, MAX_EFF_COST } from './constants'
import { log, fixWording, highlight } from './utils'

class Card {
  constructor(filters = {}) {
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
    this.strengthScaling = STATLINES_FAST
    this.type = ''
    this.filters = {
      type: TYPES.includes(filters.type) ? filters.type : '*',
      faction: FACTIONS.includes(filters.faction) ? filters.faction : '*',
    }
  }

  get name() {
    const [firstNames, lastNames] = NAMES[this.race.name]
    const firstName = arrayRandom(firstNames)
    const lastName = arrayRandom(lastNames)
    const joint = this.race.name === 'dwarf' ? '' : ' '

    return [firstName, lastName].join(joint)
  }

  shouldReroll() {
    const sum = this.mana + this.effCost

    if (sum < MIN_MANA) return true
    if (sum > MAX_MANA) return true
    if (this.effCost > MAX_EFF_COST) return true
    if (sum > 6 && this.effCost < 2) return true
    if (this.ability.length > 170) return true

    // This prevents non-sensical abilities such as “On death, destroy stronger/
    // weaker units” because we can’t do strength comparisons with a dead unit.
    if (
      this.ability.startsWith('On death') &&
      (this.ability.includes('stronger') || this.ability.includes('weaker'))
    )
      return true

    return false
  }

  generate() {
    do {
      this.getArchetype()
      this.getEffect()
      this.getRarity()
      this.getStatline()
    } while (this.shouldReroll())

    return this
  }

  getArchetype() {
    this.type =
      this.filters.type !== '*'
        ? capitalize(this.filters.type)
        : // Give more prevalence to units as there are significantly more unit
          // cards than anything else in the game.
          // See: https://stormbound-kitty.com/stats
          rwc([
            { weight: 4, id: 'Unit' },
            { weight: 1, id: 'Spell' },
            { weight: 1, id: 'Structure' },
          ])

    // Determine which races can be rolled based on the current type and the
    // faction filter.
    const races = RACES_BY_TYPE[this.type].filter(
      race =>
        this.filters.faction === '*' ||
        race.faction === '*' ||
        race.faction === this.filters.faction
    )

    // `this.race` is set to an instance of the `Race` class, and not a race
    // string descriptor like anywhere else on the site. This is why structures
    // and spells get dealt a race here, although they don’t have normally have
    // one. The `.faction` property holds the faction associated to the race
    // (e.g. Shadowfen for Toads), and the `.name` property holds the race name
    // as expected.
    this.race = arrayRandom(races)

    if (this.filters.faction !== '*') {
      this.faction = this.filters.faction
    } else {
      // Some races might not be bound to a specific faction, such as dragons.
      // In that case, we can pick a faction at random.
      this.faction =
        this.race.faction === '*' ? arrayRandom(FACTIONS) : this.race.faction
    }

    // “subrace” holds unit-modifiers such as ancient, elder and hero.
    // @TODO: move that to individual properties so there can be more than one
    // unit modifier defined at a time.
    this.subrace = ''
  }

  getStatline() {
    if (this.type === 'Unit') {
      // This will reroll the elder’s statline if it would be 3 or below. It
      // will still have a balanced statline, but it just won’t generate with a
      // statline that makes it unable to survive the damage.
      const strengthThreshold = this.subrace === 'elder' ? 3 : 0

      do {
        this.mana = random(2, MAX_MANA)
        this.movement = arrayRandom(this.race.movementRange)
        this.strength = this.strengthScaling[this.movement][this.mana - 2]
        log(`Base statline: ${this.mana}`)
      } while (parseInt(this.strength, 10) <= strengthThreshold)
    }

    if (this.type === 'Structure') {
      const strengths = ['2/2/3/3/4', '3/3/4/4/5', '4/4/5/5/6', '5/5/6/7/8']
      this.mana = random(2, 5)
      this.strength = strengths[this.mana - 2]
    }

    // Make sure not to produce incorrect cards. Only units can move, and spells
    // do not have a concept of strength.
    if (this.type !== 'Unit') this.movement = ''
    if (this.type === 'Spell') this.strength = ''
  }

  getEffect() {
    this.ability = ''
    this.effCostMult = 1
    this.effCost = 0

    let effectText = arrayRandom(this.race.abilities)

    if (this.type === 'Unit') {
      while (true) {
        const { id, effCostMult, prefix, subrace = '' } = arrayRandom(TRIGGERS)
        this.effCostMult = effCostMult
        this.ability = prefix
        this.subrace = subrace

        // The `effCost` is representative of how interesting an effect is, but
        // more accurately represents how much mana value the effect is worth.
        // For example, “Before Attacking” has a multiplier of x1, because it’s
        // very easy to trigger, including on the turn you play the card.
        // However, if it doesn’t have any initial movement, it can’t trigger
        // when played and has to be set up for a future turn, meaning it gives
        // less value and has a multiplier of x0.5.
        // For an example from the base game, if Dawnsparks had 1 movement, it
        // would have a cost of 6 + (4 x 1) (6 from the base strength, 4 from
        // the effect strength). However, this would put it at 10 mana, which is
        // too much and would cause it to be rerolled. However, since it has 0
        // movement, its value would be 6 + (4 x 0.5), which would put it at 8
        // mana.
        if (this.movement === 0 && id > 1) {
          this.effCostMult -= 0.5
        }

        effectText = arrayRandom(this.race.abilities)
        if (random(1, 3) <= effectText.valid[id]) break
      }
    } else if (this.type === 'Structure') {
      this.ability = 'At the start of your turn, '
    }

    this.ability += effectText.description

    this.effCost = effectText.cost
    log(`Base effect cost: ${this.effCost}`)

    this.effCost *= this.effCostMult
    log(
      `Adding trigger multiplier of ${this.effCostMult}. New cost: ${this.effCost}`
    )

    // Conditional triggers
    if (
      this.ability.startsWith('On play') &&
      this.race.name === 'dragon' &&
      random(1, 2) === 1 &&
      this.movement == 0
    ) {
      this.ability = this.ability.replace(
        'On play, ',
        'On play, fly to {spaceSpell} and '
      )
    }

    if (this.ability.startsWith('On play') && random(1, 3) === 1) {
      const token = this.race.name === 'pirate' ? 'pirateCondPlay' : 'condPlay'
      this.ability = this.ability.replace('On play', `{${token}}`)
    }

    if (this.ability.startsWith('On death') && random(1, 3) === 1) {
      this.ability = this.ability.replace('On death', '{condDeath}')
    }

    if (this.ability.startsWith('Before attacking') && random(1, 3) === 1) {
      this.ability = this.ability.replace('Before attacking', '{condAttack}')
    } else if (
      this.ability.startsWith('Before attacking') &&
      this.ability.includes('{targetUnit} enemy {targetUnit2}') &&
      random(1, 2) === 1
    ) {
      this.ability = this.ability.replace(
        'Before attacking',
        'Before attacking an enemy unit'
      )
      this.ability = this.ability.replace(
        '{targetUnit} enemy {targetUnit2}',
        'it'
      )
      this.effCost *= 0.75
    }

    if (
      this.race.name === 'feline' &&
      this.ability.includes('{felineCondPlay}')
    ) {
      this.ability = this.ability.replace('On play, ', '')
    }

    if (this.ability.includes(`{target${this.type}}`) && random(1, 2) === 1) {
      this.ability = this.ability
        .replace(`{target${this.type}}`, '{targetAny}')
        .replace(`{target${this.type}2}`, '{targetAny2}')
    }

    // Stat scaling
    this.strengthScaling = STATLINES_FAST

    if (this.ability.includes('{value}')) {
      const chance = random(1, 5)

      // Note that fast and none are inverted on purose. Fast scaling means it
      // increases by one step every level, while slow means it increases by one
      // step every two levels, and none means it doesn’t increase.
      // So if the ability has fast scaling, then the strength of the unit
      // shouldn't increase, and should have none scaling (like how Shady Ghoul
      // levels up). Likewise if the ability doesn’t change between levels,
      // then the strength should increase at each level.
      if (chance === 1) {
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

    // Fill in the ability slots by replacing the tokens with actual values.
    this.fillSlots()

    // Deal with unique cases.
    this.ability = fixWording(this.ability)

    if (this.ability.includes('destroy this structure')) this.effCost -= 2
    if (this.ability.includes('damage to this structure')) this.effCost -= 2

    if (random(1, 2) === 1 && this.ability.includes('friendly')) {
      let replaceText = 'unit'

      if (['construct', 'satyr'].includes(this.race.name)) {
        replaceText = capitalize(this.race.name)
        this.effCost *= 0.5
        log(`Adding specific unit multiplier of 0.5. New cost: ${this.effCost}`)
      }

      this.ability = this.ability.replaceAll('[unit]', replaceText)
    } else {
      this.ability = this.ability.replaceAll('[unit]', 'unit')
    }

    if (this.race.name === 'dragon') {
      this.ability = this.ability.replace('friendly unit', 'friendly Dragon')
      this.ability = this.ability.replace('enemy unit', 'non-Dragon unit')
      this.effCost *= 0.5
      log(`Adding specific unit multiplier of 0.5. New cost: ${this.effCost}`)
    }
  }

  getRarity() {
    this.rarity = 'epic'
    if (this.effCost % 1 < 0.66) this.rarity = 'rare'
    if (this.effCost % 1 < 0.33) this.rarity = 'common'
  }

  fillSlots() {
    while (true) {
      // Get the first replacement token.
      // RegExp delimiters:                 /         /
      // Curly braces:                       {       }
      // Capture group:                       (     )
      // Anything but:                         [^ ]+
      // Closing curly brace:                    }
      const [, target] = this.ability.match(/{([^}]+)}/) || []

      // If we can no longer find a replacement token, we are done with filling
      // the slogs.
      if (!target) return

      // Otherwise, pick a slot at random among all possible slots for that
      // replacement token (from the base slots and if applicable the faction-
      // specific slots).
      const matchesTarget = slot => slot.type === target
      const factionSlots = FACTION_SLOTS[this.faction] || []
      const allSlots = [...BASE_SLOTS, ...factionSlots]
      const validSlots = allSlots.filter(matchesTarget)
      const targetSlot = arrayRandom(validSlots)

      // Adjust the effect cost and the ability based on the picked slot.
      this.effCost *= targetSlot.cost
      this.ability = this.ability
        .replace('{' + target + '}', targetSlot.part1)
        .replace('{' + target + '2}', targetSlot.part2)

      log(
        `Adding ${target} multiplier of ${targetSlot.cost}. New cost: ${this.effCost}`
      )
    }
  }

  toObject() {
    return {
      type: this.type.toLowerCase(),
      unitTypes: [this.type === 'Unit' && this.race.name, this.subrace].filter(
        Boolean
      ),
      rarity: this.rarity,
      faction: this.faction,
      name: this.name,
      mana: (this.mana + Math.floor(this.effCost)).toString(),
      strength: this.strength.toString(),
      movement: this.movement.toString(),
      ability: highlight(capitalize(this.ability)),
      imageCardId: this.race.image,
    }
  }
}

const randomizeCard = filters => {
  const card = new Card(filters)

  return card.generate().toObject()
}

export default randomizeCard
