import AOE from './advice/AOE/index.js'
import ARCHDRUID_EARYN from './advice/ARCHDRUID_EARYN/index.js'
import BOOMING_PROFESSORS from './advice/BOOMING_PROFESSORS/index.js'
import CATNIPS_CHARM from './advice/CATNIPS_CHARM/index.js'
import CONFUSION from './advice/CONFUSION/index.js'
import DOCTOR_MIA from './advice/DOCTOR_MIA/index.js'
import DRAGONS from './advice/DRAGONS/index.js'
import EBONROCK_IRONCLAD from './advice/EBONROCK_IRONCLAD/index.js'
import FINISHER from './advice/FINISHER/index.js'
import FORTIFICATION_TONIC from './advice/FORTIFICATION_TONIC/index.js'
import FREEZE from './advice/FREEZE/index.js'
import HEARTHGUARDS from './advice/HEARTHGUARDS/index.js'
import HEROIC_SOLDIERS from './advice/HEROIC_SOLDIERS/index.js'
import HIGH_PRIESTESS_KLAXI from './advice/HIGH_PRIESTESS_KLAXI/index.js'
import KINDREDS_GRACE from './advice/KINDREDS_GRACE/index.js'
import LINKED_GOLEMS from './advice/LINKED_GOLEMS/index.js'
import LUCKY_CHARMERS from './advice/LUCKY_CHARMERS/index.js'
import MANA_COST_AVERAGE from './advice/MANA_COST_AVERAGE/index.js'
import MANA_COST_BALANCE from './advice/MANA_COST_BALANCE/index.js'
import MANA_CURVE from './advice/MANA_CURVE/index.js'
import MANA_CONSUMERS from './advice/MANA_CONSUMERS/index.js'
import NORTHSEA_DOG from './advice/NORTHSEA_DOG/index.js'
import SPELLS from './advice/SPELLS/index.js'
import MULTI_FACTIONS from './advice/MULTI_FACTIONS/index.js'
import OBSIDIAN_BUTCHERS from './advice/OBSIDIAN_BUTCHERS/index.js'
import POISON from './advice/POISON/index.js'
import QUEEN_OF_HERDS from './advice/QUEEN_OF_HERDS/index.js'
import SATYRS from './advice/SATYRS/index.js'
import STRUCTURES from './advice/STRUCTURES/index.js'
import SLOW_DECK from './advice/SLOW_DECK/index.js'
import SPELLBINDER_ZHEVANA from './advice/SPELLBINDER_ZHEVANA/index.js'
import UBASS_THE_HUNTER from './advice/UBASS_THE_HUNTER/index.js'
import UPGRADE_POINT from './advice/UPGRADE_POINT/index.js'

const ADVICE = [
  AOE,
  ARCHDRUID_EARYN,
  BOOMING_PROFESSORS,
  CATNIPS_CHARM,
  CONFUSION,
  DOCTOR_MIA,
  DRAGONS,
  EBONROCK_IRONCLAD,
  FINISHER,
  FORTIFICATION_TONIC,
  FREEZE,
  HEARTHGUARDS,
  HEROIC_SOLDIERS,
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

// Return an array of (unresolved) deck advice as promises.
// @param {Object} cardsIndex - Index of all cards in the game
// @param {Card[]} deck - Resolved deck of cards
// @param {String} modifier - Optional Brawl modifier
// @return {Promise[]}
const getDeckAdvice = async (cardsIndex, deck, modifier) => {
  if (deck.length < 12) return []

  const promises = ADVICE.map(advice => advice(deck, modifier, cardsIndex))
  const advice = await Promise.all(promises)

  return advice.filter(Boolean)
}

export default getDeckAdvice
