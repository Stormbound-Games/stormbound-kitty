import AOE from './advice/AOE'
import ARCHDRUID_EARYN from './advice/ARCHDRUID_EARYN'
import CONFUSION from './advice/CONFUSION'
import DOCTOR_MIA from './advice/DOCTOR_MIA'
import DRAGONS from './advice/DRAGONS'
import EBONROCK_IRONCLAD from './advice/EBONROCK_IRONCLAD'
import FINISHER from './advice/FINISHER'
import FORTIFICATION_TONIC from './advice/FORTIFICATION_TONIC'
import FREEZE from './advice/FREEZE'
import HEARTHGUARDS from './advice/HEARTHGUARDS'
import HIGH_PRIESTESS_KLAXI from './advice/HIGH_PRIESTESS_KLAXI'
import KINDREDS_GRACE from './advice/KINDREDS_GRACE'
import LINKED_GOLEMS from './advice/LINKED_GOLEMS'
import LUCKY_CHARMERS from './advice/LUCKY_CHARMERS'
import MANA_COST_AVERAGE from './advice/MANA_COST_AVERAGE'
import MANA_COST_BALANCE from './advice/MANA_COST_BALANCE'
import MANA_CURVE from './advice/MANA_CURVE'
import MANA_CONSUMERS from './advice/MANA_CONSUMERS'
import NORTHSEA_DOG from './advice/NORTHSEA_DOG'
import SPELLS from './advice/SPELLS'
import MULTI_FACTIONS from './advice/MULTI_FACTIONS'
import OBSIDIAN_BUTCHERS from './advice/OBSIDIAN_BUTCHERS'
import POISON from './advice/POISON'
import QUEEN_OF_HERDS from './advice/QUEEN_OF_HERDS'
import SATYRS from './advice/SATYRS'
import STRUCTURES from './advice/STRUCTURES'
import SLOW_DECK from './advice/SLOW_DECK'
import SPELLBINDER_ZHEVANA from './advice/SPELLBINDER_ZHEVANA'
import UBASS_THE_HUNTER from './advice/UBASS_THE_HUNTER'
import UPGRADE_POINT from './advice/UPGRADE_POINT'

const ADVICE = [
  AOE,
  ARCHDRUID_EARYN,
  CONFUSION,
  DOCTOR_MIA,
  DRAGONS,
  EBONROCK_IRONCLAD,
  FINISHER,
  FORTIFICATION_TONIC,
  FREEZE,
  HEARTHGUARDS,
  HIGH_PRIESTESS_KLAXI,
  KINDREDS_GRACE,
  LINKED_GOLEMS,
  LUCKY_CHARMERS,
  MANA_COST_AVERAGE,
  MANA_COST_BALANCE,
  MANA_CURVE,
  MANA_CONSUMERS,
  NORTHSEA_DOG,
  SPELLS,
  MULTI_FACTIONS,
  OBSIDIAN_BUTCHERS,
  POISON,
  QUEEN_OF_HERDS,
  SATYRS,
  SLOW_DECK,
  SPELLBINDER_ZHEVANA,
  STRUCTURES,
  UBASS_THE_HUNTER,
  UPGRADE_POINT,
]

/**
 * Return an array of (unresolved) deck advice as promises.
 * @param {Cards[]} deck - Resolved deck of cards
 * @param {String} modifier - Optional Brawl modifier
 * @return {Promise[]}
 */
const getDeckAdvice = (deck, modifier) => {
  // Some advice could be asynchronous, so we make them all asynchronous by
  // wrapping them with `Promise.resolve`.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
  return ADVICE.map(advice => Promise.resolve(advice(deck, modifier)))
}

export default getDeckAdvice
