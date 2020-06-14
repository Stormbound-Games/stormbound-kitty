import cards from '../../data/cards'
import arrayRandom from '../arrayRandom'
import getResolvedCardData from '../getResolvedCardData'

const FREEZE_CARDS = ['W2', 'W6', 'W11']
const POISON_CARDS = ['F2', 'F4', 'F5', 'F13']

const getRandomCard = (cards, deck, options) => {
  const card = arrayRandom(cards)
  const hasEnoughLegendaries =
    deck.filter(card => card.rarity === 'legendary').length >=
    options.maxLegendaryCards
  const hasEnoughEpics =
    deck.filter(card => card.rarity === 'epic').length >= options.maxEpicCards
  const hasEnoughSpells = deck.filter(card => card.type === 'spell').length >= 4
  const hasEnoughStructures =
    deck.filter(card => card.type === 'structure').length >= 3
  const hasEnoughNeutrals =
    deck.filter(card => card.faction === 'neutral').length >=
    12 - options.minFactionCards
  const hasEnoughExpensiveCards =
    deck.filter(card => card.mana >= 5).length >= 4
  const hasCardAlready = deck.find(c => c.id === card.id)

  if (
    hasCardAlready ||
    (card.mana >= 5 && hasEnoughExpensiveCards) ||
    (card.rarity === 'epic' && hasEnoughEpics) ||
    (card.rarity === 'legendary' && hasEnoughLegendaries) ||
    (card.faction === 'neutral' && hasEnoughNeutrals) ||
    (card.type === 'structure' && hasEnoughStructures) ||
    (card.type === 'spell' && hasEnoughSpells)
  ) {
    return getRandomCard(cards, deck, options)
  }

  switch (card.id) {
    case 'W1' /* Icicle Burst */:
    case 'W4' /* Wisp Cloud */: {
      const hasFreezeCards =
        deck.filter(card => FREEZE_CARDS.includes(card.id)).length >= 2
      if (!hasFreezeCards) return getRandomCard(cards, deck, options)
      break
    }

    case 'F15' /* Amberhides */:
    case 'F11' /* Marked as Prey */: {
      const hasPoisonCards =
        deck.filter(card => POISON_CARDS.includes(card.id)).length >= 2
      if (!hasPoisonCards) return getRandomCard(cards, deck, options)
      break
    }

    case 'S5' /* Faun Companions */:
    case 'S7' /* MoonLit Aerie */:
    case 'S9' /* Swarmcallers */: {
      const hasSatyrCards =
        deck.filter(card => card.race === 'satyr').length >= 3
      if (!hasSatyrCards) return getRandomCard(cards, deck, options)
      break
    }

    case 'I7' /* Greengale Serpents */:
    case 'F9' /* Wandering Wyverns */:
    case 'N43' /* Ludic Matriarchs */:
    case 'N51' /* Dangerous Suitors */: {
      const hasDragonCards =
        deck.filter(card => card.race === 'dragon').length >= 2
      if (!hasDragonCards) return getRandomCard(cards, deck, options)
      break
    }

    case 'N6' /* Spare Dragonling */: {
      const hasDragonCards =
        deck.filter(card => card.race === 'dragon').length >= 3
      if (!hasDragonCards) return getRandomCard(cards, deck, options)
      break
    }

    case 'N42' /* Lucky Charmers */: {
      const hasPirateCards =
        deck.filter(card => card.race === 'pirate').length >= 3
      if (!hasPirateCards) return getRandomCard(cards, deck, options)
      break
    }

    case 'I8' /* Linked Golems */: {
      const hasConstructCards =
        deck.filter(card => card.race === 'construct').length >= 2
      if (!hasConstructCards) return getRandomCard(cards, deck, options)
      break
    }

    case 'I3' /* Fortification Tonic */: {
      const hasCheapStructureCard =
        deck
          .filter(card => card.type === 'structure')
          .filter(card => card.id !== 'I14' && card.mana <= 4).length >= 1
      if (!hasCheapStructureCard) return getRandomCard(cards, deck, options)
      break
    }

    case 'N39' /* Hearthguards */: {
      const hasStructureCards =
        deck.filter(card => card.type === 'structure' || card.id === 'W13')
          .length >= 1
      if (!hasStructureCards) return getRandomCard(cards, deck, options)
      break
    }

    case 'N48' /* Archdruid Earyn */: {
      const hasSpellCards =
        deck.filter(card => card.type === 'spell').length >= 2
      if (!hasSpellCards) return getRandomCard(cards, deck, options)
      break
    }

    case 'F23' /* High Priestess Klaxi */: {
      const ids = deck.map(c => c.id)
      const hasRainOfFrogs = ids.includes('F8')
      const hasAzureHatchers = ids.includes('F10')

      if (!hasRainOfFrogs && !hasAzureHatchers)
        return getRandomCard(cards, deck, options)
      break
    }

    default:
      return card
  }
  return card
}

/**
 * Return a random deck (cards not resolved).
 * @param {Object} options - Randomisation options
 * @param {String} options.faction - Deck faction
 * @param {Card[]} options.availableCards - Cards than can be picked
 * @param {Number} options.maxLegendaryCards - Maximum amount of legendary cards
 * @param {Number} options.maxEpicCards - Maximum amount of epic cards
 * @param {Number} options.minFactionCards  - Minimum amount of faction cards
 * @param {Card[]} options.initialCards  - Cards to force into the deck
 */
const getRandomDeck = options => {
  const isMatchingFaction = card =>
    card.faction === 'neutral' ||
    (options.faction ? card.faction === options.faction : true)
  const deck = (options.initialCards || []).filter(isMatchingFaction)
  const rounds = 12 - deck.length
  const availableCards = (options.availableCards || cards)
    .filter(isMatchingFaction)
    .filter(card => !card.token)
    .map(getResolvedCardData)

  for (let i = 0; i < rounds; i += 1) {
    try {
      deck.push(getRandomCard(availableCards, deck, options))
    } catch (error) {
      if (error instanceof RangeError) {
        return getRandomDeck(options)
      }
    }
  }

  return deck.map(card => ({ id: card.id, level: card.level || 1 }))
}

export default getRandomDeck
