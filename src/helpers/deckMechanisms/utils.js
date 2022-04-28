import {
  PROBABILITIES,
  ROGUE_SHEEP_RNG,
  HARVESTERS_OF_SOULS_RNG,
} from '~/constants/dryRunner'
import arrayRandom from '~/helpers/arrayRandom'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import modifyDeck from '~/helpers/modifyDeck'
import shuffle from '~/helpers/shuffle'
import isCard, { isNotCard } from '~/helpers/isCard'

const getHarvestersOfSoulsCopiedCard = (state, pool, harvestersLevel) => {
  // The RNG for Harvesters of Souls is determined by first choosing a level for
  // the created copy and then creating the copy if the level is greater than 1
  // (otherwise Harvesters weren’t able to copy the card).
  const lowestPossibleLevel =
    harvestersLevel +
    HARVESTERS_OF_SOULS_RNG.LEVEL_BONUS[state.RNG] -
    HARVESTERS_OF_SOULS_RNG.MAX_DEVIATION
  const possibleLevelValues = Array.from(
    { length: 2 * HARVESTERS_OF_SOULS_RNG.MAX_DEVIATION + 1 },
    (_, i) => lowestPossibleLevel + i
  )
  const level = Math.min(arrayRandom(possibleLevelValues), 5)

  if (level <= 0 || pool.length === 0) return null

  const { id } = arrayRandom(pool)
  const copiedCard = getResolvedCardData(state.cardsIndex, { id, level })
  const copiedCardStrength = [5, 6, 7, 8, 10][harvestersLevel - 1]

  copiedCard.weight = 0
  copiedCard.id = id
  copiedCard.idx = state.deck.filter(card => card.id === id).length.toString()
  copiedCard.created = true

  copiedCard.strengthIncreased = copiedCardStrength > copiedCard.strength
  copiedCard.strengthDecreased = copiedCardStrength < copiedCard.strength

  if (copiedCard.token) {
    copiedCard.level = copiedCardStrength

    if (
      // A Token Raven was created by Dubious Hags, High Priestess Klaxi, Marked
      // as Prey, Avian Stalkers or Call for Aid on a raven.
      (copiedCard.id === 'T5' &&
        Math.random() < PROBABILITIES.NO_MOVEMENT_RAVEN_TOKEN) ||
      // A Token Toad was created by Azure Hatchers, Brood Sages, Rain of Frogs,
      // Call for Aid on a Toad.
      (copiedCard.id === 'T8' &&
        Math.random() < PROBABILITIES.NO_MOVEMENT_TOAD_TOKEN)
    ) {
      copiedCard.movement = 0
      copiedCard.movementDecreased = true
    }
  } else {
    copiedCard.strength = copiedCardStrength
  }

  return copiedCard
}

export const getRogueSheepCardCopies = (state, level) => {
  const draws = [1, 1, 2, 2, 3][level - 1]
  const deck = shuffle(state.opponentDeck)
  const hand = deck.slice(0, 4)
  const pool = hand.filter(card => !card.unitTypes.includes('pirate'))
  const hasPirateInHand = state.hand.some(c => c.unitTypes.includes('pirate'))
  const copyLevel = ROGUE_SHEEP_RNG.LEVEL[state.RNG]

  return pool
    .slice(0, draws)
    .map(card =>
      getResolvedCardData(state.cardsIndex, { id: card.id, level: copyLevel })
    )
    .map(card => ({
      ...card,
      singleUse: true,
      manaDecreased: hasPirateInHand,
      mana: hasPirateInHand ? Math.max(card.mana - 1, 0) : card.mana,
      idx: state.deck.filter(c => c.id === card.id).length.toString(),
    }))
}

export const getHarvestersOfSoulsPossibleCards = (state, level) => {
  const count = HARVESTERS_OF_SOULS_RNG.POTENTIAL_CARDS[state.RNG]
  const pool = state.opponentDeck.filter(card => card.type === 'unit')
  const acc = Array.from({ length: count }).reduce(
    acc => {
      const card = getHarvestersOfSoulsCopiedCard(state, acc.pool, level)

      // If Harvesters of Souls did not manage to copy a card, move along.
      return !card
        ? acc
        : {
            cards: acc.cards.concat(card),
            pool: acc.pool.filter(isNotCard(card)),
          }
    },
    { cards: [], pool }
  )

  return modifyDeck(
    state.cardsIndex,
    acc.cards,
    state.modifier,
    state.equalsMode
  )
}

export const isPlayableSpell = state => card => {
  const cardInDeck = state.deck.find(isCard(card))

  return cardInDeck.type === 'spell' && cardInDeck.mana <= 7
}

export const getCollectorMirzToken = (cardsIndex, deck, level) => {
  const id = 'T' + arrayRandom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15])
  const token = getResolvedCardData(cardsIndex, { id })
  token.level = [5, 6, 6, 8, 10][level - 1]
  token.weight = 0
  token.mana = 0
  token.id = id
  token.idx = deck.filter(card => card.id === id).length.toString()
  token.created = true
  token.strengthIncreased = true
  return token
}
