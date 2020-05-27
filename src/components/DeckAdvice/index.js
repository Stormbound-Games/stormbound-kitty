import React from 'react'
import LearnMoreIcon from '../LearnMoreIcon'
import Title from '../Title'
import getResolvedCardData from '../../helpers/getResolvedCardData'

const STABLE_FINISHERS = [
  /* RUNNERS */
  /* Warfront Runners */ 'N28',
  /* Bluesail Raiders */ 'N30',
  /* Hearthguards */ 'N39',
  /* Tegor the Vengeful */ 'N46',
  /* Salty Outcasts */ 'N52',
  /* Joust Champions */ 'N55',
  /* Siren of the Seas */ 'N58',
  /* Razor-Sharp Lynxes */ 'N65',
  /* Chaotic Pupil */ 'I12',
  /* Agents in Charge */ 'I25',
  /* Wolfcloaks */ 'W17',
  /* Fleshmenders */ 'W18',
  /* Chillbeards */ 'W22',
  /* Olf The Hammer */ 'W23',
  /* Sleetstompers */ 'W26',
  /* Grim Couriers */ 'S17',
  /* Lasting Remains */ 'S23',
  /* Obliterators */ 'S26',
  /* Obsidian Butchers */ 'F17',

  /* CHIP */
  /* Ubass the Hunter */ 'N35',
  /* Needle Blast */ 'N44',
  /* Pillars of Doom */ 'S18',
  /* Vindicators */ 'S22',
  /* Dark Harvest */ 'S15',
  /* Hairy Chestnuts */ 'F28',
  /* Siege Assembly */ 'I19',
  /* Booming Professors */ 'I28',
  /* Visions of the Grove */ 'W21',

  /* MISC */
  /* Forgotten Souls */ 'S6',
  /* Herald’s Hymn */ 'S20',
]

const LOW_LEVEL_FINISHERS = [
  /* Windmakers */ 'I20',
  /* Draconic Roamers */ 'S12',
]

const HIGH_LEVEL_FINISHERS = [
  /* First Mutineer */ 'N12',
  /* Rapid Mousers */ 'N71',
  /* Limelimbs */ 'F25',
  /* Restless Goats */ 'S2',
  /* Terrific Slayers */ 'N27',
  /* Wild Saberpaws */ 'N67',
]

const DEBATABLE_FINISHERS = [
  /* Powder Tower */ 'N45',
  /* Hair-Raising Cats */ 'N61',
  /* Mischiefs */ 'S13',
  /* Greengale Serpents */ 'I7',
  /* Overchargers */ 'I15',
  /* Dangerous Suiters */ 'N51',
  /* Lady Rime */ 'W10',
  /* Lucky Charmers */ 'N42',
  /* High Priestess Klaxi */ 'F23',
  /* Petrified Fossils */ 'S27',
]

const getRaces = cards => [...new Set(cards.map(c => c.race).filter(Boolean))]
const getFactions = cards =>
  [...new Set(cards.map(c => c.faction))].filter(
    faction => faction !== 'neutral'
  )
const getSpells = cards =>
  cards.filter(c => c.type === 'spell' && c.id !== 'N2')
const getConstructs = cards => cards.filter(c => c.race === 'construct')
const getStructures = cards => cards.filter(c => c.type === 'structure')
const getStaticCards = cards => cards.filter(c => (c.movement | 0) < 1)
const getAverageManaCost = cards =>
  (cards.map(c => c.mana).reduce((a, b) => a + b, 0) / cards.length).toFixed(2)
const getEvenManaCards = cards => cards.filter(c => c.mana % 2 === 0)
const getOddManaCards = cards => cards.filter(c => c.mana % 2 !== 0)
const lacksAoE = cards => {
  const ids = cards.map(c => c.id)

  if (
    /* Beasts of Terror */ ids.includes('N18') ||
    /* Victors of the Melee */ ids.includes('N47') ||
    /* Hunter’s Vengeance */ ids.includes('N23') ||
    /* Bladestorm */ ids.includes('N29') ||
    /* Needle Blast */ ids.includes('N44') ||
    /* Powder Tower */ ids.includes('N45') ||
    /* Joust Champions */ ids.includes('N55') ||
    /* Crazy Bombers */ ids.includes('N57') ||
    /* Sirens of the Seas */ ids.includes('N58') ||
    /* Trekking Aldermen */ ids.includes('N73') ||
    /* Broken Earth Drake */ ids.includes('W15') ||
    /* Flaming Stream */ ids.includes('I18') ||
    /* Windmakers */ ids.includes('I20') ||
    /* Toxic Sacrifice */ ids.includes('F4') ||
    /* Crimson Sentry */ ids.includes('F5') ||
    /* Witches of the Wild */ ids.includes('F14') ||
    /* Dark Harvest */ ids.includes('S15') ||
    /* Frosthexers + Wisp Cloud */ (ids.includes('W2') && ids.includes('W4')) ||
    /* Frosthexers + Midwinter Chaos */ (ids.includes('W2') &&
      ids.includes('W11')) ||
    /* Midwinter Chaos + Wisp Cloud */ (ids.includes('W11') &&
      ids.includes('W4')) ||
    /* Moment’s Peace + Midwinter Chaos */ (ids.includes('W6') &&
      ids.includes('W11')) ||
    /* Moment’s Peace + Wisp Cloud */ (ids.includes('W6') && ids.includes('W4'))
  ) {
    return false
  }

  return true
}

const getDebatableFinishers = cards =>
  cards.filter(card => DEBATABLE_FINISHERS.includes(card.id))
const getFinishers = cards =>
  cards.filter(
    card =>
      STABLE_FINISHERS.includes(card.id) ||
      ((card.level === 1 || card.level === 2) &&
        LOW_LEVEL_FINISHERS.includes(card.id)) ||
      ((card.level === 4 || card.level === 5) &&
        HIGH_LEVEL_FINISHERS.includes(card.id))
  )

const getSuggestions = cards => {
  const averageManaCost = getAverageManaCost(cards)
  const staticCards = getStaticCards(cards)
  const factions = getFactions(cards)
  const spells = getSpells(cards)
  const races = getRaces(cards)
  const structures = getStructures(cards)
  const hasArchdruidEaryn = cards.map(c => c.id).includes('N48')
  const hasUbassTheHunter = cards.map(c => c.id).includes('N35')
  const hasDoctorMia = cards.map(c => c.id).includes('I2')
  const miaStructures = structures.filter(
    c => c.id !== 'N13' && c.id !== 'I5' && c.id !== 'I14'
  )
  const hasLinkedGolems = cards.map(c => c.id).includes('I8')
  const constructs = getConstructs(cards)
  const oddManaCards = getOddManaCards(cards)
  const evenManaCards = getEvenManaCards(cards)
  const finishers = getFinishers(cards)
  const debatableFinishers = getDebatableFinishers(cards)

  return [
    finishers.length === 0 &&
      (debatableFinishers.length === 0
        ? {
            id: 'LACK_OF_FINISHER',
            name: 'Lacks of finisher',
            description:
              'This deck doesn’t have a finisher, also known as a win-condition. Try including one or more runners, heavy strikers or cards doing chip damage to the base.',
          }
        : {
            id: 'LACK_OF_STABLE_FINISHER',
            name: 'Lacks of finisher',
            description:
              'This deck doesnt have a stable finisher, only some potential win-condition under good circumstances.  Try including one or more runners, heavy strikers or cards doing chip damage to the base.',
            highlight: () => debatableFinishers,
          }),

    factions.length > 1 && {
      id: 'MULTI_FACTIONS',
      name: 'Multi-factions',
      description: `This deck counts ${factions.length} factions, which is not technically permitted in Stormbound. This deck cannot be played in game.`,
    },

    averageManaCost > 5.5 && {
      id: 'HEAVY_DECK',
      name: 'Heavy deck',
      description: `This deck has an average mana cost of ${averageManaCost}, which might be a little high. Consider including some cheaper cards so the mana flow gets smoother.`,
    },

    averageManaCost < 3 && {
      id: 'LIGHT_DECK',
      name: 'Light deck',
      description: `This deck has an average mana cost of ${averageManaCost}, which might be a little low. Consider including one or two more expensive cards to be able to power through long games.`,
      highlight: () => cards.filter(c => c.mana < averageManaCost),
    },

    staticCards.length > 6 && {
      id: 'SLOW_DECK',
      name: 'Slow deck',
      description: `This deck has ${staticCards.length} cards that don’t initially move, which makes it more likely to struggle against aggressive and rush decks. Consider swapping some static cards for some movers.`,
      highlight: () => staticCards,
    },

    spells.length > 2 && {
      id: 'MANY_SPELLS',
      name: 'Many spells',
      description: `This deck has ${spells.length} spells which might be unusually high. Consider swapping a spell for a unit or structure to be less situational.`,
    },

    hasArchdruidEaryn &&
      spells.length < 2 && {
        id: 'INEFFICIENT_EARYN',
        name: 'Undervalued Archdruid Earyn',
        description: `This deck includes Archdruid Earyn but has only ${spells.length} spell, which is unusually low. Consider adding an extra spell to get the most out of Archdruid Earyn.`,
        highlight: () => ['N48', ...spells],
      },

    lacksAoE(cards) && {
      id: 'LACK_OF_AOE',
      name: 'Lack of AoE',
      description:
        'It doesn’t look like this deck includes any way to deal damage to multiple units at once. Consider bringing a card or card combo which can clean several units.',
    },

    hasUbassTheHunter &&
      races.length < 4 && {
        id: 'INEFFICIENT_UBASS',
        name: 'Undervalued Ubass the Hunter',
        description: `This deck includes Ubass the Hunter but has only ${races.length} races which is unusually low. Consider bring more races to get the most out of Ubass the Hunter.`,
        highlight: () => ['N35'],
      },

    evenManaCards.length >= 9 && {
      id: 'EVEN_MANA_COST',
      name: 'Even-mana cost',
      description:
        'This deck has most cards costing an even amount of mana, therefore reducing the amount of cards that can be played on odd turns. Consider balancing the mana cost a bit more.',
      highlight: () => evenManaCards,
    },

    oddManaCards.length >= 9 && {
      id: 'ODD_MANA_COST',
      name: 'Odd-mana cost',
      description:
        'This deck has most cards costing an odd amount of mana, therefore reducing the amount of cards that can be played on even turns. Consider balancing the mana cost a bit more.',
      highlight: () => oddManaCards,
    },

    hasDoctorMia &&
      miaStructures.length === 0 && {
        id: 'INEFFICIENT_MIA',
        name: 'Undervalued Doctor Mia',
        description:
          'This deck includes Doctor Mia but doesn’t include any structures that have a good synergy with her. Consider including structures such as Upgrade Point, or Siege Assembly.',
        highlight: () => ['I2', ...structures],
      },

    hasLinkedGolems &&
      constructs.length <= 2 && {
        id: 'INEFFICIENT_LINKED_GOLEMS',
        name: 'Undervalued Linked Golems',
        description:
          'This deck includes Linked Golems but doesn’t include enough constructs to provide good synergy. Consider including more constructs.',
        highlight: () => constructs,
      },
  ].filter(Boolean)
}

export default function DeckAdvice(props) {
  const cards = props.deck.map(getResolvedCardData)
  const suggestions = getSuggestions(cards, props.highlight)

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className='DeckAdvice'>
      <Title>
        Suggestions <LearnMoreIcon anchor='#incorrect-deck-suggestions' />
      </Title>

      {suggestions.map(suggestion => (
        <p
          key={suggestion.name}
          onMouseOver={
            suggestion.highlight
              ? () => props.highlight(suggestion.highlight(cards))
              : undefined
          }
          onMouseOut={() => props.highlight([])}
          id={suggestion.id}
        >
          <strong className='Highlight'>{suggestion.name}:</strong>{' '}
          {suggestion.description}
        </p>
      ))}
    </div>
  )
}
