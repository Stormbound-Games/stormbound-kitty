import EVEN_MANA_COST from './advice/EVEN_MANA_COST'
import HEAVY_DECK from './advice/HEAVY_DECK'
import HIGH_MANA_CURVE from './advice/HIGH_MANA_CURVE'
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
import MANY_SPELLS from './advice/MANY_SPELLS'
import MULTI_FACTIONS from './advice/MULTI_FACTIONS'
import ODD_MANA_COST from './advice/ODD_MANA_COST'
import SLOW_DECK from './advice/SLOW_DECK'
import serialisation from '../serialisation'
import getResolvedCardData from '../getResolvedCardData'

const ADVICE = {
  EVEN_MANA_COST,
  HEAVY_DECK,
  HIGH_MANA_CURVE,
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
  MANY_SPELLS,
  MULTI_FACTIONS,
  ODD_MANA_COST,
  SLOW_DECK,
}

const getCards = id =>
  serialisation.deck.deserialise(id).map(getResolvedCardData)

const TESTS = [
  ['MULTI_FACTIONS', '5n15n25n33n633n71n643w114w72i253f172s184n44'],
  ['HEAVY_DECK', '1n701n481n491n501n511n521n531n541n551n561n571n58'],
  ['LIGHT_DECK', '1n11n21n31n41n51n61n621n631n671n661n71n8'],
  ['SLOW_DECK', '4n382s195n131n702n232n625n194n345n32s34s13s14'],
  ['MANY_SPELLS', '1w11n21n631n231n151n91n211n291n311n401n441n50'],
  ['INEFFICIENT_KLAXI', '1f41n81n611n181n91n251f131n311n341n361n381f23'],
  [
    'INEFFICIENT_KLAXI (Brood sages)',
    '1n21f11n41n71n731n191n91n211n241n361n701f23',
  ],
  ['INEFFICIENT_EARYN', '1n11n101n111n121i91i61i141n321n691n721n471n48'],
  ['INEFFICIENT_UBASS', '1n11i11i81i91i61i141n241i271i161n321n351n47'],
  ['INEFFICIENT_MIA', '1n11n21i11i21i81i91i61n241i271i161n321n47'],
  ['INEFFICIENT_LINKED_GOLEMS', '1i11n51i41n101i81n731n191n281i201n381n701n55'],
  [
    'INEFFICIENT_OBSIDIAN_BUTCHERS',
    '1n621n661n101f271n91n591f131n311f171n761f211f22',
  ],
  ['INEFFICIENT_ZHEVANA', '1n501w191n621w171n701n51n631n141w81w281n151n41'],
  [
    'INEFFICIENT_FREEZE_COMBOS',
    '1n51n621n631n141n151w41w281n411w171n701n501w19',
  ],
  [
    'INEFFICIENT_POISON_COMBOS',
    '1n11n671n71n141f61n161n171f151n331n451n701n55',
  ],
  [
    'INEFFICIENT_SATYR_COMBOS',
    '1s241n621n101n111n611s71n191n641n241n351n721n53',
  ],
  ['INEFFICIENT_BROOD_SAGES', '1n11f11n41n671n71n141f61n161n331n451n701n55'],
  [
    'INEFFICIENT_CONFUSION_COMBOS',
    '1n11n21f41n81n611n181n91f131n341n361n381f23',
  ],
  ['INEFFICIENT_UPGRADE_POINT', '1n11n21i11n31i41n121i101i141i151n301n321n46'],
  ['HIGH_MANA_CURVE', '1n11w11w21n51n81n121w281w81w61w161n461n52', 'MATCH'],
  ['HIGH_MANA_CURVE', '5n185n195n595n205n215n225n755n415n645n245n715n65'],
  ['LACK_OF_AOE', '1n11n21n31n671n71n101n201i141n651n271i281n76'],
  [
    'LACK_OF_AOE (Beasts of Terror)',
    '1n11n21n31n671n71n101n181n201i141n651n271i28',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Victors of the Melee)',
    '1n11n21n31n671n71n101n201i141n651n271i281n47',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Hunter’s Vengeance)',
    '1n11n21n31n671n71n101n231n201i141n651n271i28',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Voidsurgers)',
    '1n11n21n31n671n71n101n201i141n651n271n291i28',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Bladestorm)',
    '1n11n21n31n671n71n101n201i141n651n271n361i28',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Needle Blast)',
    '1n11n21n31n671n71n101n201i141n651n271i281n44',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Powder Tower)',
    '1n11n21n31n671n71n101n201i141n651n271i281n45',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Joust Champions)',
    '1n11n21n31n671n71n101n201i141n651n271i281n55',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Crazy Bombers)',
    '1n11n21n31n671n71n101n201i141n651n271i281n57',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Siren of the Seas)',
    '1n11n21n31n671n71n101n201i141n651n271i281n58',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Trekking Aldermen)',
    '1n11n21n31n671n71n101n731n201i141n651n271i28',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Broken Earth Drake)',
    '1n11n21n31n41n621n151w71n241w81w161n381w15',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Flaming Stream)',
    '1n11n21n31n671n71n101n201i141n651n271i181i28',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Windmakers)',
    '1n11n21n31n671n71n101n201i141n651n271i201i28',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Toxic Sacrifice)',
    '1n21f41f31n31n661f271n591n211n751n641f161n76',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Crimson Sentry)',
    '1n21f31n31n661f51f271n591n211n751n641f161n76',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Witches of the Wild)',
    '1n21f31n31n661f271n591n211n751n641f141f161n76',
    'MATCH',
  ],
  [
    'LACK_OF_AOE (Dark Harvest)',
    '1n631n141s251n191n91s121n241n261s151s191n461n48',
    'MATCH',
  ],
]

describe('The `getDeckAdvice` helper', () => {
  TESTS.forEach(([advice, deckId, expectation]) => {
    const [adviceName] = advice.split(' ')

    it('should handle ' + advice, () => {
      if (expectation === 'MATCH') {
        expect(ADVICE[adviceName](getCards(deckId))).to.equal(null)
      } else {
        expect(ADVICE[adviceName](getCards(deckId))).to.not.equal(null)
      }
    })
  })
})
