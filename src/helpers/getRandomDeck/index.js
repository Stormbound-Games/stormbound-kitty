import cards from '../../data/cards'
import arrayRandom from '../arrayRandom'
import getResolvedCardData from '../getResolvedCardData'
import hasInefficientConfusion from '../getDeckAdvice/advice/CONFUSION'
import hasTooManyStructures from '../getDeckAdvice/advice/STRUCTURES'
import hasTooManySpells from '../getDeckAdvice/advice/SPELLS'
import hasHighManaAverage from '../getDeckAdvice/advice/MANA_COST_AVERAGE'
import hasInefficientFreeze from '../getDeckAdvice/advice/FREEZE'
import hasInefficientPoison from '../getDeckAdvice/advice/POISON'
import hasInefficientSatyrs from '../getDeckAdvice/advice/SATYRS'
import hasInefficientDragons from '../getDeckAdvice/advice/DRAGONS'
import hasInefficientLuckyCharmers from '../getDeckAdvice/advice/LUCKY_CHARMERS'
import hasInefficientLinkedGolems from '../getDeckAdvice/advice/LINKED_GOLEMS'
import hasInefficientFortificationTonic from '../getDeckAdvice/advice/FORTIFICATION_TONIC'
import hasInefficientHearthguards from '../getDeckAdvice/advice/HEARTHGUARDS'
import hasInefficientKlaxi from '../getDeckAdvice/advice/HIGH_PRIESTESS_KLAXI'
import hasInefficientObsidianButchers from '../getDeckAdvice/advice/OBSIDIAN_BUTCHERS'
import hasInefficientMia from '../getDeckAdvice/advice/DOCTOR_MIA'
import hasInefficientEaryn from '../getDeckAdvice/advice/ARCHDRUID_EARYN'
import hasEbonrockIronclad from '../getDeckAdvice/advice/EBONROCK_IRONCLAD'
import hasInefficientKindredsGrace from '../getDeckAdvice/advice/KINDREDS_GRACE'
import hasInefficientManaConsumer from '../getDeckAdvice/advice/MANA_CONSUMERS'
import hasInefficientNorthseaDog from '../getDeckAdvice/advice/NORTHSEA_DOG'
import hasInefficientQueenofHerds from '../getDeckAdvice/advice/QUEEN_OF_HERDS'
import hasInefficientZhevana from '../getDeckAdvice/advice/SPELLBINDER_ZHEVANA'
import hasInefficientUbass from '../getDeckAdvice/advice/UBASS_THE_HUNTER'
import hasSlowDeck from '../getDeckAdvice/advice/SLOW_DECK'

const DEFAULT_OPTIONS = {
  availableCards: cards,
  faction: null,
  initialCards: [],
  maxEpicCards: 4,
  maxLegendaryCards: 2,
  minFactionCards: 3,
}

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
  const currentDeck = [...deck, card]

  if (
    hasCardAlready ||
    (card.mana >= 5 && hasEnoughExpensiveCards) ||
    (card.rarity === 'epic' && hasEnoughEpics) ||
    (card.rarity === 'legendary' && hasEnoughLegendaries) ||
    (card.faction === 'neutral' && hasEnoughNeutrals) ||
    hasInefficientConfusion(currentDeck) ||
    hasTooManyStructures(currentDeck) ||
    hasTooManySpells(currentDeck) ||
    hasHighManaAverage(currentDeck) ||
    hasInefficientFreeze(currentDeck) ||
    hasInefficientPoison(currentDeck) ||
    hasInefficientSatyrs(currentDeck) ||
    hasInefficientDragons(currentDeck) ||
    hasInefficientLuckyCharmers(currentDeck) ||
    hasInefficientLinkedGolems(currentDeck) ||
    hasInefficientFortificationTonic(currentDeck) ||
    hasInefficientHearthguards(currentDeck) ||
    hasInefficientKlaxi(currentDeck) ||
    hasInefficientObsidianButchers(currentDeck) ||
    hasInefficientMia(currentDeck) ||
    hasInefficientEaryn(currentDeck) ||
    hasEbonrockIronclad(currentDeck) ||
    hasInefficientKindredsGrace(currentDeck) ||
    hasInefficientManaConsumer(currentDeck) ||
    hasInefficientNorthseaDog(currentDeck) ||
    hasInefficientQueenofHerds(currentDeck) ||
    hasInefficientZhevana(currentDeck) ||
    hasInefficientUbass(currentDeck) ||
    hasSlowDeck(currentDeck)
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
