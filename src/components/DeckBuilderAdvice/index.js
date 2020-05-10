import React from 'react'
import LearnMoreIcon from '../LearnMoreIcon'
import Title from '../Title'
import getResolvedCardData from '../../helpers/getResolvedCardData'

const getRaces = cards => [...new Set(cards.map(c => c.race))]
const getFactions = cards =>
  [...new Set(cards.map(c => c.faction))].filter(
    faction => faction !== 'neutral'
  )
const getSpells = cards =>
  cards.filter(c => c.type === 'spell' && c.id !== 'N2')
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
    /* Crazy Bombers */ ids.includes('N57') ||
    /* Sirens of the Seas */ ids.includes('N58') ||
    /* Broken Earth Drake */ ids.includes('W15') ||
    /* Chaotic Pupil */ ids.includes('I12') ||
    /* Flaming Stream */ ids.includes('I18') ||
    /* Toxic Sacrifice */ ids.includes('F4') ||
    /* Crimson Sentry */ ids.includes('F5') ||
    /* Witches of the Wild */ ids.includes('F14') ||
    /* Dark Harvest */ ids.includes('S15') ||
    /* Frosthexers + Wisp Cloud */ (ids.includes('W2') && ids.includes('W4')) ||
    /* Frosthexers + Midwinter Chaos */ (ids.includes('W2') &&
      ids.includes('W11')) ||
    /* Midwinter Chaos + Wisp Cloud */ (ids.includes('W11') &&
      ids.includes('W4'))
  ) {
    return false
  }

  return true
}

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
  const oddManaCards = getOddManaCards(cards)
  const evenManaCards = getEvenManaCards(cards)

  return [
    factions.length > 1 && {
      name: 'Multi-factions',
      description: `This deck counts ${factions.length} factions, which is not technically permitted in Stormbound. This deck cannot be played in game.`,
    },

    averageManaCost > 5.5 && {
      name: 'Heavy deck',
      description: `This deck has an average mana cost of ${averageManaCost}, which might be a little high. Consider including some cheaper cards so the mana flow gets smoother.`,
    },

    averageManaCost < 3 && {
      name: 'Light deck',
      description: `This deck has an average mana cost of ${averageManaCost}, which might be a little low. Consider including one or two more expensive cards to be able to power through long games.`,
      highlight: () => cards.filter(c => c.mana < averageManaCost),
    },

    staticCards.length > 6 && {
      name: 'Slow deck',
      description: `This deck has ${staticCards.length} cards that don’t initially move, which makes it more likely to struggle against aggressive and rush decks. Consider swapping some static cards for some movers.`,
      highlight: () => staticCards,
    },

    spells.length > 2 && {
      name: 'Many spells',
      description: `This deck has ${spells.length} spells which might be unusually high. Consider swapping a spell for a unit or structure to be less situational.`,
    },

    hasArchdruidEaryn &&
      spells.length < 2 && {
        name: 'Undervalued Archdruid Earyn',
        description: `This deck includes Archdruid Earyn but has only ${spells.length} spell, which is unusually low. Consider adding an extra spell to get the most out of Archdruid Earyn.`,
        highlight: () => ['N48', ...spells],
      },

    lacksAoE(cards) && {
      name: 'Lack of AoE',
      description:
        'It doesn’t look like this deck includes any way to deal damage to multiple units at once. Consider bringing a card or card combo which can clean several units.',
    },

    hasUbassTheHunter &&
      races.length < 4 && {
        name: 'Undervalued Ubass the Hunter',
        description: `This deck includes Ubass the Hunter but has only ${races.length} races which is unusually low. Consider bring more races to get the most out of Ubass the Hunter.`,
        highlight: () => ['N35'],
      },

    evenManaCards.length >= 9 && {
      name: 'Even-mana cost',
      description:
        'This deck has most cards costing an even amount of mana, therefore reducing the amount of cards that can be played on odd turns. Consider balancing the mana cost a bit more.',
      highlight: () => evenManaCards,
    },

    oddManaCards.length >= 9 && {
      name: 'Odd-mana cost',
      description:
        'This deck has most cards costing an odd amount of mana, therefore reducing the amount of cards that can be played on even turns. Consider balancing the mana cost a bit more.',
      highlight: () => oddManaCards,
    },

    hasDoctorMia &&
      miaStructures.length === 0 && {
        name: 'Undervalued Doctor Mia',
        description:
          'This deck includes Doctor Mia but doesn’t include any structures that have a good synergy with her. Consider including structures such as Upgrade Point, or Siege Assembly.',
        highlight: () => ['I2', ...structures],
      },
  ].filter(Boolean)
}

export default function DeckBuilderAdvice(props) {
  const cards = props.deck.map(getResolvedCardData)
  const suggestions = getSuggestions(cards, props.highlight)

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className='DeckBuilderAdvice'>
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
        >
          <strong className='Highlight'>{suggestion.name}:</strong>{' '}
          {suggestion.description}
        </p>
      ))}
    </div>
  )
}
