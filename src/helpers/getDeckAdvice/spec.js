import EVEN_MANA_COST from './advice/EVEN_MANA_COST'
import HEAVY_DECK from './advice/HEAVY_DECK'
import HIGH_MANA_CURVE from './advice/HIGH_MANA_CURVE'
import INEFFICIENT_BROOD_SAGES from './advice/INEFFICIENT_BROOD_SAGES'
import INEFFICIENT_CONFUSION_COMBOS from './advice/INEFFICIENT_CONFUSION_COMBOS'
import INEFFICIENT_DRAGON_COMBOS from './advice/INEFFICIENT_DRAGON_COMBOS'
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
  INEFFICIENT_DRAGON_COMBOS,
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
  {
    advice: 'EVEN_MANA_COST',
    deck: '5n25f44f13f25f35n35n95n152f84f104f114n40',
    label: 'should handle too many even mana cards',
    modifier: 'SPELL_MANA',
    disabled: true,
  },
  {
    advice: 'MULTI_FACTIONS',
    deck: '5n15n25n33n633n71n643w114w72i253f172s184n44',
    label: 'should handle multi-factions',
  },
  {
    advice: 'HEAVY_DECK',
    deck: '1n701n481n491n501n511n521n531n541n551n561n571n58',
    label: 'should handle heavy deck',
  },
  {
    advice: 'LIGHT_DECK',
    deck: '1n11n21n31n41n51n61n621n631n671n661n71n8',
    label: 'should handle light deck',
  },
  {
    advice: 'LIGHT_DECK',
    deck: '5n15f85n25f45f35n35n675n95n155f105n405n76',
    label: 'should hand light brawl deck',
    modifier: 'SPELL_MANA',
    disabled: true,
  },
  {
    advice: 'SLOW_DECK',
    deck: '4n382s195n131n702n232n625n194n345n32s34s13s14',
    label: 'should handle slow deck',
  },
  {
    advice: 'MANY_SPELLS',
    deck: '1w11n21n631n231n151n91n211n291n311n401n441n50',
    label: 'should handle too many spells',
  },
  {
    advice: 'MANY_SPELLS',
    deck: '5n12f85n25f45f35n32n675n95n154f104n402n76',
    label: 'should handle too many spells brawl deck',
    modifier: 'SPELL_MANA',
    disabled: true,
  },
  {
    advice: 'MANY_SPELLS',
    deck: '5w25n35n95n115n145n164w64w93n693w163w194w21',
    label: 'should handle too many spells with Gift of the Wise',
    disabled: true,
  },
  {
    advice: 'MANY_SPELLS',
    deck: '1n15f85f45f15f25f35n35f135f145f155n405n52',
    label: 'should handle too many spells',
    disabled: true,
  },
  {
    advice: 'INEFFICIENT_KLAXI',
    deck: '5f45n85n615n185n95n255f135n315n345n365n385f23',
    label: 'should handle inefficient Klaxi',
  },
  {
    advice: 'INEFFICIENT_KLAXI',
    deck: '5n25f15n45n75n735n195n95n215n245n365n705f23',
    label: 'inefficient Klaxi with Brood sages',
  },
  {
    advice: 'INEFFICIENT_DRAGON_COMBOS',
    deck: '1n11n21f41f11n31n71f91n161n591n221f201n56',
    label: 'should handle inefficient dragon combos',
  },
  {
    advice: 'INEFFICIENT_EARYN',
    deck: '1n11n101n111n121i91i61i141n321n691n721n471n48',
    label: 'should handle inefficient Earyn (no spell)',
  },
  {
    advice: 'INEFFICIENT_EARYN',
    deck: '1n15n35n45n115n125n145f105n215f145n295n445n48',
    label: 'should handle inefficient Earyn',
  },
  {
    advice: 'INEFFICIENT_UBASS',
    deck: '1n11i11i81i91i61i141n241i271i161n321n351n47',
    label: 'should handle inefficient Ubass',
  },
  {
    advice: 'INEFFICIENT_MIA',
    deck: '1n11n21i11i21i81i91i61n241i271i161n321n47',
    label: 'should handle inefficient Mia',
  },
  {
    advice: 'INEFFICIENT_LINKED_GOLEMS',
    deck: '1i11n51i41n101i81n731n191n281i201n381n701n55',
    label: 'should handle inefficient Linked Golems',
  },
  {
    advice: 'INEFFICIENT_OBSIDIAN_BUTCHERS',
    deck: '5n625n665n105f275n95n595f135n315f175n765f215f22',
    label: 'should handle inefficient Obsidian Butchers',
  },
  {
    advice: 'INEFFICIENT_ZHEVANA',
    deck: '1n501w191n621w171n701n51n631n141w81w281n151n41',
    label: 'should handle inefficient Zhevana',
  },
  {
    advice: 'INEFFICIENT_FREEZE_COMBOS',
    deck: '1n51n621n631n141n151w41w281n411w171n701n501w19',
    label: 'should handle inefficient freeze combos',
  },
  {
    advice: 'INEFFICIENT_POISON_COMBOS',
    deck: '1n11n671n71n141f61n161n171f151n331n451n701n55',
    label: 'should handle inefficient poison combos',
  },
  {
    advice: 'INEFFICIENT_SATYR_COMBOS',
    deck: '1s241n621n101n111n611s71n191n641n241n351n721n53',
    label: 'should handle inefficient satyr combos',
  },
  {
    advice: 'INEFFICIENT_SATYR_COMBOS',
    deck: '1s11s241s51n611s251s71n191n241n251n351n721n53',
    label: 'should handle inefficient satyr combo with Head Start',
    disabled: true,
  },
  {
    advice: 'INEFFICIENT_BROOD_SAGES',
    deck: '1n11f11n41n671n71n141f61n161n331n451n701n55',
    label: 'should handle inefficient Brood Sages',
  },
  {
    advice: 'INEFFICIENT_CONFUSION_COMBOS',
    deck: '1n11n21f41n81n611n181n91f131n341n361n381f23',
    label: 'should handle inefficient confusion combos',
  },
  {
    advice: 'INEFFICIENT_UPGRADE_POINT',
    deck: '1n11n21i11n31i41n121i101i141i151n301n321n46',
    label: 'should handle inefficient Upgrade Point',
  },
  {
    advice: 'INEFFICIENT_UPGRADE_POINT',
    deck: '3n13n23i13i23i33n33i43i83i103i63i123n34',
    label: 'should handle inefficient Upgrade Point',
    disabled: true,
  },
  {
    advice: 'HIGH_MANA_CURVE',
    deck: '1n11w11w21n51n81n121w281w81w61w161n461n52',
    label: 'should handle high mana curve',
    disabled: true,
  },
  {
    advice: 'HIGH_MANA_CURVE',
    deck: '5n185n195n595n205n215n225n755n415n645n245n715n65',
    label: 'should handle high mana curve',
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271i281n76',
    label: 'should handle lack of aoe',
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n181n201i141n651n271i28',
    label: 'should handle lack of aoe (Beasts of Terror)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271i281n47',
    label: 'should handle lack of aoe (Victors of the Melee)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n231n201i141n651n271i28',
    label: 'should handle lack of aoe (Hunter’s Vengeance)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271n291i28',
    label: 'should handle lack of aoe (Bladestorm)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271n361i28',
    label: 'should handle lack of aoe (Voidsurgers)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271i281n44',
    label: 'should handle lack of aoe (Needle Blast)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271i281n45',
    label: 'should handle lack of aoe (Powder Tower)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271i281n55',
    label: 'should handle lack of aoe (Joust Champions)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271i281n57',
    label: 'should handle lack of aoe (Crazy Bombers)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271i281n58',
    label: 'should handle lack of aoe (Siren of the Seas)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '5n15n25n33n632n673n72n102n204i142n653n272i28',
    label: 'should handle lack of aoe (Unhealthy Hysteria)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n731n201i141n651n271i28',
    label: 'should handle lack of aoe (Trekking Aldermen)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n41n621n151w71n241w81w161n381w15',
    label: 'should handle lack of aoe (Broken Earth Drake)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271i181i28',
    label: 'should handle lack of aoe (Flaming Stream)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n11n21n31n671n71n101n201i141n651n271i201i28',
    label: 'should handle lack of aoe (Windmakers)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n21f41f31n31n661f271n591n211n751n641f161n76',
    label: 'should handle lack of aoe (Toxic Sacrifice)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n21f31n31n661f51f271n591n211n751n641f161n76',
    label: 'should handle lack of aoe (Crimson Sentry)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n21f31n31n661f271n591n211n751n641f141f161n76',
    label: 'should handle lack of aoe (Witches of the Wild)',
    disabled: true,
  },
  {
    advice: 'LACK_OF_AOE',
    deck: '1n631n141s251n191n91s121n241n261s151s191n461n48',
    label: 'should hand lack of aoe (Dark Harvest)',
    disabled: true,
  },
]

describe('The `getDeckAdvice` helper', () => {
  TESTS.forEach(test => {
    const handler = ADVICE[test.advice]
    it(test.label, () => {
      const cards = getCards(test.deck)

      if (test.disabled) {
        expect(handler(cards, test.modifier)).to.equal(null)
      } else {
        expect(handler(cards, test.modifier)).to.not.equal(null)
      }
    })
  })
})
