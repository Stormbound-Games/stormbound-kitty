import CARDS from '../../data/cards'
import arrayRandom from '../arrayRandom'
import getResolvedCardData from '../getResolvedCardData'
import CONFUSION from '../getDeckAdvice/advice/CONFUSION'
import STRUCTURES from '../getDeckAdvice/advice/STRUCTURES'
import SPELLS from '../getDeckAdvice/advice/SPELLS'
import MANA_COST_AVERAGE from '../getDeckAdvice/advice/MANA_COST_AVERAGE'
import FREEZE from '../getDeckAdvice/advice/FREEZE'
import POISON from '../getDeckAdvice/advice/POISON'
import SATYRS from '../getDeckAdvice/advice/SATYRS'
import DRAGONS from '../getDeckAdvice/advice/DRAGONS'
import LUCKY_CHARMERS from '../getDeckAdvice/advice/LUCKY_CHARMERS'
import LINKED_GOLEMS from '../getDeckAdvice/advice/LINKED_GOLEMS'
import FORTIFICATION_TONIC from '../getDeckAdvice/advice/FORTIFICATION_TONIC'
import HEARTHGUARDS from '../getDeckAdvice/advice/HEARTHGUARDS'
import HIGH_PRIESTESS_KLAXI from '../getDeckAdvice/advice/HIGH_PRIESTESS_KLAXI'
import OBSIDIAN_BUTCHERS from '../getDeckAdvice/advice/OBSIDIAN_BUTCHERS'
import DOCTOR_MIA from '../getDeckAdvice/advice/DOCTOR_MIA'
import ARCHDRUID_EARYN from '../getDeckAdvice/advice/ARCHDRUID_EARYN'
import EBONROCK_IRONCLAD from '../getDeckAdvice/advice/EBONROCK_IRONCLAD'
import KINDREDS_GRACE from '../getDeckAdvice/advice/KINDREDS_GRACE'
import MANA_CONSUMERS from '../getDeckAdvice/advice/MANA_CONSUMERS'
import NORTHSEA_DOG from '../getDeckAdvice/advice/NORTHSEA_DOG'
import QUEEN_OF_HERDS from '../getDeckAdvice/advice/QUEEN_OF_HERDS'
import SPELLBINDER_ZHEVANA from '../getDeckAdvice/advice/SPELLBINDER_ZHEVANA'
import UBASS_THE_HUNTER from '../getDeckAdvice/advice/UBASS_THE_HUNTER'
import SLOW_DECK from '../getDeckAdvice/advice/SLOW_DECK'

const DEFAULT_OPTIONS = {
  availableCards: CARDS,
  faction: null,
  initialCards: [],
  maxEpicCards: 4,
  maxLegendaryCards: 2,
  minFactionCards: 3,
}

const isCausingWarning = advice => (deck, card) => {
  return !advice(deck) && advice([...deck, card])
}
const hasInefficientConfusion = isCausingWarning(CONFUSION)
const hasInefficientFreeze = isCausingWarning(FREEZE)
const hasInefficientDragons = isCausingWarning(DRAGONS)
const hasInefficientEaryn = isCausingWarning(ARCHDRUID_EARYN)
const hasInefficientFortificationTonic = isCausingWarning(FORTIFICATION_TONIC)
const hasInefficientHearthguards = isCausingWarning(HEARTHGUARDS)
const hasInefficientKindredsGrace = isCausingWarning(KINDREDS_GRACE)
const hasInefficientKlaxi = isCausingWarning(HIGH_PRIESTESS_KLAXI)
const hasInefficientLinkedGolems = isCausingWarning(LINKED_GOLEMS)
const hasInefficientLuckyCharmers = isCausingWarning(LUCKY_CHARMERS)
const hasInefficientManaConsumer = isCausingWarning(MANA_CONSUMERS)
const hasInefficientMia = isCausingWarning(DOCTOR_MIA)
const hasInefficientNorthseaDog = isCausingWarning(NORTHSEA_DOG)
const hasInefficientObsidianButchers = isCausingWarning(OBSIDIAN_BUTCHERS)
const hasInefficientPoison = isCausingWarning(POISON)
const hasInefficientQueenofHerds = isCausingWarning(QUEEN_OF_HERDS)
const hasInefficientSatyrs = isCausingWarning(SATYRS)
const hasInefficientUbass = isCausingWarning(UBASS_THE_HUNTER)
const hasInefficientZhevana = isCausingWarning(SPELLBINDER_ZHEVANA)
const hasTooManySpells = isCausingWarning(SPELLS)
const hasTooManyStructures = isCausingWarning(STRUCTURES)
const hasHighManaAverage = isCausingWarning(MANA_COST_AVERAGE)
const hasSlowDeck = isCausingWarning(SLOW_DECK)
const hasEbonrockIronclad = isCausingWarning(EBONROCK_IRONCLAD)

const getRandomCard = (cards, deck, options) => {
  const card = arrayRandom(cards)
  const hasEnoughLegendaries =
    deck.filter(card => card.rarity === 'legendary').length >=
    options.maxLegendaryCards
  const hasEnoughEpics =
    deck.filter(card => card.rarity === 'epic').length >= options.maxEpicCards
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
    hasInefficientConfusion(deck, card) ||
    hasTooManyStructures(deck, card) ||
    hasTooManySpells(deck, card) ||
    hasHighManaAverage(deck, card) ||
    hasInefficientFreeze(deck, card) ||
    hasInefficientPoison(deck, card) ||
    hasInefficientSatyrs(deck, card) ||
    hasInefficientDragons(deck, card) ||
    hasInefficientLuckyCharmers(deck, card) ||
    hasInefficientLinkedGolems(deck, card) ||
    hasInefficientFortificationTonic(deck, card) ||
    hasInefficientHearthguards(deck, card) ||
    hasInefficientKlaxi(deck, card) ||
    hasInefficientObsidianButchers(deck, card) ||
    hasInefficientMia(deck, card) ||
    hasInefficientEaryn(deck, card) ||
    hasEbonrockIronclad(deck, card) ||
    hasInefficientKindredsGrace(deck, card) ||
    hasInefficientManaConsumer(deck, card) ||
    hasInefficientNorthseaDog(deck, card) ||
    hasInefficientQueenofHerds(deck, card) ||
    hasInefficientZhevana(deck, card) ||
    hasInefficientUbass(deck, card) ||
    hasSlowDeck(deck, card)
  ) {
    return getRandomCard(cards, deck, options)
  }

  return card
}

const isMatchingFaction = faction => card =>
  card.faction === 'neutral' || (faction ? card.faction === faction : true)

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
const getRandomDeck = (options = {}) => {
  // Merge the given options with the default options.
  for (let option in DEFAULT_OPTIONS) {
    if (typeof options[option] === 'undefined') {
      options[option] = DEFAULT_OPTIONS[option]
    }
  }

  const isFromExpectedFaction = isMatchingFaction(options.faction)

  // The starting deck are the given initial cards (if any), provided they do
  // not conflict with the given faction.
  const deck = options.initialCards
    .map(card =>
      getResolvedCardData({
        id: card.id,
        level: card.level || 1,
      })
    )
    .filter(isFromExpectedFaction)

  // The amount of missing cards is the total length of a deck (12) minus the
  // amount of initial cards (after faction mismatches have been removed).
  const rounds = 12 - deck.length

  // The available cards are the provided ones if any, otherwise the default
  // card collection, minus all the cards that don’t match the provided faction,
  // as well as the token cards.
  const availableCards = options.availableCards
    .map(card =>
      getResolvedCardData({
        id: card.id,
        level: card.level || 1,
      })
    )
    .filter(isFromExpectedFaction)
    .filter(card => !card.token)

  // For every missing card in the deck, we pick a new card at random and add it
  // to the deck. If it fails due to an infinite loop (which should not happen
  // but we never know), we retry generating the deck from scratch.
  for (let i = 0; i < rounds; i += 1) {
    try {
      deck.push(getRandomCard(availableCards, deck, options))
    } catch (error) {
      if (error instanceof RangeError) {
        return getRandomDeck(options)
      }
    }
  }

  return deck
}

export default getRandomDeck
