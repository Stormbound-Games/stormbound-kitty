import EVEN_MANA_COST from './advice/EVEN_MANA_COST'
import HEAVY_DECK from './advice/HEAVY_DECK'
import INEFFICIENT_BROOD_SAGES from './advice/INEFFICIENT_BROOD_SAGES'
import INEFFICIENT_CONFUSION_COMBOS from './advice/INEFFICIENT_CONFUSION_COMBOS'
import INEFFICIENT_EARYN from './advice/INEFFICIENT_EARYN'
import INEFFICIENT_FREEZE_COMBOS from './advice/INEFFICIENT_FREEZE_COMBOS'
import INEFFICIENT_KLAXI from './advice/INEFFICIENT_KLAXI'
import INEFFICIENT_LINKED_GOLEMS from './advice/INEFFICIENT_LINKED_GOLEMS'
import INEFFICIENT_MIA from './advice/INEFFICIENT_MIA'
import INEFFICIENT_OBSIDIAN_BUTCHERS from './advice/INEFFICIENT_OBSIDIAN_BUTCHERS'
import INEFFICIENT_POISON_COMBOS from './advice/INEFFICIENT_POISON_COMBOS'
import INEFFICIENT_SATYR_COMBOS from './advice/INEFFICIENT_SATYR_COMBOS'
import INEFFICIENT_UBASS from './advice/INEFFICIENT_UBASS'
import INEFFICIENT_UPGRADE_POINT from './advice/INEFFICIENT_UPGRADE_POINT'
import INEFFICIENT_ZHEVANA from './advice/INEFFICIENT_ZHEVANA'
import LACK_OF_AOE from './advice/LACK_OF_AOE'
import LACK_OF_FINISHER from './advice/LACK_OF_FINISHER'
import LIGHT_DECK from './advice/LIGHT_DECK'
import HIGH_MANA_CURVE from './advice/HIGH_MANA_CURVE'
import MANY_SPELLS from './advice/MANY_SPELLS'
import MULTI_FACTIONS from './advice/MULTI_FACTIONS'
import ODD_MANA_COST from './advice/ODD_MANA_COST'
import SLOW_DECK from './advice/SLOW_DECK'

const ADVICE = [
  EVEN_MANA_COST,
  HEAVY_DECK,
  INEFFICIENT_BROOD_SAGES,
  INEFFICIENT_CONFUSION_COMBOS,
  INEFFICIENT_EARYN,
  INEFFICIENT_FREEZE_COMBOS,
  INEFFICIENT_KLAXI,
  INEFFICIENT_LINKED_GOLEMS,
  INEFFICIENT_MIA,
  INEFFICIENT_OBSIDIAN_BUTCHERS,
  INEFFICIENT_POISON_COMBOS,
  INEFFICIENT_SATYR_COMBOS,
  INEFFICIENT_UBASS,
  INEFFICIENT_UPGRADE_POINT,
  INEFFICIENT_ZHEVANA,
  LACK_OF_AOE,
  LACK_OF_FINISHER,
  LIGHT_DECK,
  HIGH_MANA_CURVE,
  MANY_SPELLS,
  MULTI_FACTIONS,
  ODD_MANA_COST,
  SLOW_DECK,
]

export default (cards, modifier) =>
  ADVICE.map(advice => advice(cards, modifier)).filter(Boolean)
