import {
  PROBABILITIES,
  HARVESTERS_OF_SOULS_RNG,
} from '../../constants/dryRunner'
import arrayRandom from '../../helpers/arrayRandom'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import isCard, { isNotCard } from '../../helpers/isCard'
import shuffle from '../../helpers/shuffle'
import play from './play'
import cycle from './cycle'
import draw from './draw'
import modifyDeck from '../../helpers/modifyDeck'

// Used to get Archdruid’s Earyn mana cost to know whether spells can be played
// for free by her ability. The level would need to be adjusted accordingly and
// dynamically if Earyn’s mana cost started varying per level.
const ARCHDRUID_EARYN = getResolvedCardData({ id: 'N48', level: 1 })
// Frozen enemies left after a card's ability has been resolved, in regular RNG mode
const FROZEN_ENEMIES_AFTER = {
  // Frosthexers
  W2: [1, 2, 3, 3, 4],
  // Moment’s Peace
  W6: [2, 3, 3, 4, 4],
  // Midwinter Chaos
  W11: [3, 3, 3, 2, 1],
  // Wisp Cloud
  W4: [0, 0, 0, 1, 2],
}

/**
 * Mutate the given state following the given card’s ability.
 * @param {Object} state - State being mutated
 * @param {Object} card - Resolved card being played
 * @param {String} mode - Game mode (MANUAL or AUTOMATIC)
 * @param {Object} HoS - Reference & Method used to show Harvester’s Dialog
 * @return {Object} Mutated state
 */
const handleCardEffect = (state, card, mode, HoS) => {
  // On turn 1, any 3 mana card can be played since it would be the only one
  // to be played and would not fill the board by itself. Any 2 mana card will
  // have to be played together with a 1 mana card. This will cause a board
  // filling issue only when this card is Rain of Frogs.
  // The remaining playable cards are Green Prototypes, Summon Militia and Rain
  // of Frogs. In these cases, the `emptyCellsIndicator` variable represents how
  // many cells are free. In the other cases it is not needed and will never be
  // set to 0.
  switch (card.id) {
    // Green Prototypes (necessarily advance the frontline since only the
    // four 1 mana cards are taken into account)
    case 'N1': {
      if (state.turn === 1) {
        state.specifics.emptyCellsIndicator += 4
      }
      break
    }

    // Summon Militia (won’t cause any board filling issues)
    case 'N2': {
      if (state.turn === 1) {
        state.specifics.noUnitsOnFirstTurn = false
        state.specifics.emptyCellsIndicator = Math.max(
          state.specifics.emptyCellsIndicator - 1,
          0
        )
      }
      break
    }

    // Rain of Frogs
    case 'F8': {
      const frogs = [4, 5, 5, 6, 6]

      if (state.turn === 1) {
        state.specifics.noUnitsOnFirstTurn = false
        state.specifics.emptyCellsIndicator = Math.max(
          state.specifics.emptyCellsIndicator - frogs[card.level - 1],
          0
        )
      }
      break
    }

    // Head Start
    case 'S24': {
      if (state.turn === 1) {
        state.specifics.noUnitsOnFirstTurn = false
      }
      break
    }

    // Icicle Burst
    case 'W1': {
      // Icicle Burst should destroy the frozen enemy unit if there is only
      // one on the board.
      if (state.specifics.frozenEnemiesLevel === 1) {
        state.specifics.frozenEnemiesLevel = 0
        // Otherwise should freeze an enemy unit if there is no frozen unit on
        // the board yet.
      } else if (state.specifics.frozenEnemiesLevel === 0) {
        state.specifics.frozenEnemiesLevel = 1
      }
      break
    }

    // Frozen Core
    case 'W9': {
      state.specifics.activeFrozenCores += 1
      break
    }

    // Find how many frozen enemies there are on the board. This is not a
    // precise number but gives an approximation (one, a few, many, all) of
    // this amount. Based on this approximation and the card that has just
    // been played, store how many frozen enemies stayed on the board.
    case 'W2':
    case 'W4':
    case 'W6':
    case 'W11': {
      // For example, playing Midwinter Chaos will freeze a lot of units,
      // but if there are already many frozen units on the board, it will
      // generally destroy them.
      const frozenEnemiesNowRegular =
        FROZEN_ENEMIES_AFTER[card.id][state.specifics.frozenEnemiesLevel]

      // If the RNG is friendly, the enemy units were spawned in such a way
      // that an additional unit gets frozen every time a freezing card is
      // played.
      if (state.RNG === 'FRIENDLY') {
        state.specifics.frozenEnemiesLevel = Math.min(
          frozenEnemiesNowRegular + 1,
          4
        )
      }

      // If the RNG is unfriendly, the opposite happens: freezing cards are not
      // as efficient and less enemy units get frozen.
      else if (state.RNG === 'UNFRIENDLY') {
        state.specifics.frozenEnemiesLevel = Math.max(
          frozenEnemiesNowRegular - 1,
          0
        )
      }
      // In the regular case, just store the new approximation in the
      // `frozenEnemiesLevel` specific.
      else {
        state.specifics.frozenEnemiesLevel = frozenEnemiesNowRegular
      }
      break
    }

    // Dawnsparks
    case 'W16': {
      state.specifics.activeDawnsparks += 1
      break
    }

    // Freebooters
    case 'N14': {
      const { hand } = state

      if (mode !== 'MANUAL' && hand.length < 4) {
        draw(state)
        if (card.level >= 4 && hand.length < 4) draw(state)
      }

      break
    }

    // Rimelings
    case 'W12': {
      state.mana += 3
      break
    }

    // Gift of the Wise
    case 'W19': {
      state.mana += +card.ability.match(/(\d+)/)[1]
      break
    }

    // Snake Eyes
    case 'N33': {
      if (mode !== 'MANUAL' && state.hand.length === 3) {
        state.hand.forEach(cardInHand =>
          cycle(state, cardInHand, { countAsCycled: false })
        )

        if (card.level >= 4) draw(state)
      }
      break
    }

    // Lady Rime
    case 'W10': {
      state.mana = 0
      break
    }

    // Archdruid Earyn
    case 'N48': {
      const spells = state.hand.filter(isPlayableSpell(state))
      const shuffledSpells = shuffle(spells)

      if (mode !== 'MANUAL' && spells.length > 0) {
        play(state, shuffledSpells[0], { mode, free: true })

        if (card.level >= 4 && spells.length > 1) {
          play(state, shuffledSpells[1], { mode, free: true })
        }
      }
      break
    }

    // Collector Mirz
    case 'N8': {
      state.deck.push(getCollectorMirzToken(state.deck, card.level))
      break
    }

    // First Mutineer
    case 'N12': {
      const nonPirates = state.hand.filter(isNotPirate(state))

      if (mode !== 'MANUAL' && nonPirates.length > 0) {
        play(state, arrayRandom(nonPirates), { mode, discard: true })
      }
      break
    }

    // Goldgrubbers
    case 'N22': {
      const nonPirates = state.hand.filter(isNotPirate(state))

      if (mode !== 'MANUAL' && nonPirates.length > 0) {
        cycle(state, arrayRandom(nonPirates), { countAsCycled: false })
      }
      break
    }

    // Counselor Ahmi
    case 'S3': {
      if (
        state.RNG === 'FRIENDLY' ||
        (state.RNG === 'REGULAR' && Math.random() <= PROBABILITIES.AHMI_RETURNS)
      ) {
        state.hand.push(card)
      }
      break
    }

    // Queen of Herds
    case 'S21': {
      const satyrs = state.deck.filter(isSatyrInDeck(state))
      let satyr1, satyr2

      // If Queen of Herds is played without any satyr in the remaining cards
      // from the deck, there is nothing more to do.
      if (mode === 'MANUAL' || satyrs.length === 0) {
        break
      }

      // Pick a satyr from the remaining cards from a deck at random and play
      // it for free.
      // Note: it seems that QoH does not draw satyrs based on their weight,
      // hence the use of `arrayRandom` instead of `rwcDuplicates`.
      // See: https://discordapp.com/channels/293674725069029377/564840207875178502/676580933180325920
      // Note: it seems that QoH spawns do not cause a weighing of the deck.
      // See: https://discordapp.com/channels/293674725069029377/564840207875178502/676580198057246730
      satyr1 = arrayRandom(satyrs)
      play(state, satyr1, { mode, free: true, reweight: false })

      // If Queen of Herds is level 4 or 5 and there were more than single
      // satyr in the remaining cards from the deck, a second one can be
      // picked at random and played for free.
      if (satyrs.length > 1 && card.level >= 4) {
        satyr2 = arrayRandom(satyrs.filter(isNotCard(satyr1)))

        if (satyr2) {
          play(state, satyr2, { mode, free: true, reweight: false })
        }
      }

      break
    }

    // Spellbinder Zhevana gains mana depending on the approximation of the
    // number of frozen enemy units on the board. The RNG appearing in the
    // game—how many units are played in the same column—is replaced by a RNG
    // variation when cards like Frosthexers or Midwinter Chaos are actually
    // played.
    case 'W8': {
      const { frozenEnemiesLevel } = state.specifics
      // Zhevana destroys some of the frozen units—the amount of remaining
      // frozen units was chosen arbitrarily and is set to 50%.
      // Note: The `frozenEnemiesLevel` does still not indicate how many enemy
      // frozen units there are on the board—it only gives an approximation,
      // from 0 (no) to 4 (almost all).
      state.mana += frozenEnemiesLevel * 4
      state.specifics.frozenEnemiesLevel = Math.floor(frozenEnemiesLevel / 2)
      break
    }

    // Harvesters of Souls
    case 'N38': {
      const copiedCards = getHarvestersOfSoulsPossibleCards(state, card.level)
      if (copiedCards.length) {
        HoS.setCards(copiedCards)
      }
      break
    }

    default:
  }

  return state
}

const isNotPirate = state => card =>
  state.deck.find(isCard(card)).race !== 'pirate'

const isSatyrInDeck = state => card =>
  !state.hand.find(isCard(card)) &&
  state.deck.find(isCard(card)).race === 'satyr'

const isPlayableSpell = state => card => {
  const cardInDeck = state.deck.find(isCard(card))

  return cardInDeck.type === 'spell' && cardInDeck.mana <= ARCHDRUID_EARYN.mana
}

function getCollectorMirzToken(deck, level) {
  const id = 'T' + arrayRandom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15])
  const token = getResolvedCardData({ id })
  token.level = [5, 6, 6, 8, 10][level - 1]
  token.weight = 0
  token.id = id
  token.idx = deck.filter(card => card.id === id).length.toString()
  token.created = true
  token.strengthIncreased = true
  return token
}

function getHarvestersOfSoulsPossibleCards(state, level) {
  const possibleCards = Array.from(
    { length: HARVESTERS_OF_SOULS_RNG.POTENTIAL_CARDS[state.RNG] },
    () => getHarvestersOfSoulsCopiedCard(state, level)
  ).filter(Boolean)
  return modifyDeck(possibleCards, state.modifier, state.equalsMode)
}

function getHarvestersOfSoulsCopiedCard(state, harvestersLevel) {
  // The RNG for Harvesters of Souls is determined by first choosing a level for the
  // created copy and then creating the copy if the level is greater than 1 (otherwise
  // Harvesters weren't able to copy the card)
  const lowestPossibleLevel =
    harvestersLevel +
    HARVESTERS_OF_SOULS_RNG.LEVEL_BONUS[state.RNG] -
    HARVESTERS_OF_SOULS_RNG.MAX_DEVIATION
  const possibleLevelValues = Array.from(
    { length: 2 * HARVESTERS_OF_SOULS_RNG.MAX_DEVIATION + 1 },
    (_, i) => lowestPossibleLevel + i
  )
  const level = Math.min(arrayRandom(possibleLevelValues), 5)
  const enemyUnits = state.opponentDeck.filter(
    cardInDeck => cardInDeck.type === 'unit'
  )

  if (level <= 0 || enemyUnits.length === 0) return

  const id = arrayRandom(enemyUnits).id
  const copiedCard = getResolvedCardData({ id, level })
  const copiedCardStrength = [5, 6, 7, 8, 10][harvestersLevel - 1]

  copiedCard.weight = 0
  copiedCard.id = id
  copiedCard.idx = state.deck.filter(card => card.id === id).length.toString()
  copiedCard.created = true

  copiedCard.strengthIncreased = copiedCardStrength > copiedCard.strength
  copiedCard.strengthDecreased = copiedCardStrength < copiedCard.strength

  if (copiedCard.token) {
    copiedCard.level = copiedCardStrength
    if (copiedCard.id === 'T5') {
      // A Token Raven was created - by Dubious Hags, High Priestess Klaxi,
      // Marked as Prey, Avian Stalkers or Call for Aid on a Raven
      if (Math.random() < PROBABILITIES.NO_MOVEMENT_RAVEN_TOKEN) {
        // High Priestess Klaxi spawns tokens with no movement
        copiedCard.movement = 0
        copiedCard.movementDecreased = true
      }
    } else if (copiedCard.id === 'T8') {
      // A Token Toad was created - by Azure Hatchers, Brood Sages,
      // Rain of Frogs, Call for Aid on a Toad
      if (Math.random() < PROBABILITIES.NO_MOVEMENT_TOAD_TOKEN) {
        // Brood Sages and Rain of Frogs spawn tokens with no movement
        copiedCard.movement = 0
        copiedCard.movementDecreased = true
      }
    }
  } else {
    copiedCard.strength = copiedCardStrength
  }
  return copiedCard
}

export default handleCardEffect
