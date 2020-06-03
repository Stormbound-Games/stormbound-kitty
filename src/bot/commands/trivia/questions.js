import dateFormat from 'dateformat'
import { FACTIONS, RACES } from '../../../constants/game'
import cards from '../../../data/cards'
import arrayRandom from '../../../helpers/arrayRandom'
import capitalise from '../../../helpers/capitalise'

const CARD_NAMES = cards.filter(card => !card.token).map(card => card.name)

export default [
  {
    difficulty: 'EASY',
    question: 'Which unit type is Powder Tower built by?',
    answer: 'pirate',
    options: Object.keys(RACES),
  },

  {
    difficulty: 'EASY',
    question: 'Which card was made from the Create-A-Card event?',
    answer: 'Harvester of Souls',
    options: CARD_NAMES,
  },

  {
    difficulty: 'EASY',
    question: 'How many rare cards come in the Collector’s Edition bundle?',
    answer: 34,
    options: [22, 24, 26, 28, 30, 32, 36, 38, 40, 42, 44],
  },

  {
    difficulty: 'EASY',
    question: 'What is the “attack order” when playing a unit with movement?',
    answer: 'Forwards, inwards, outwards',
    options: [
      'Inwards, outwards, forwards',
      'Forwards, outwards, inwards',
      'Inwards, forwards, outwards',
      'Outwards, inwards, forwards',
      'Outwards, forwards, inwards',
    ],
  },

  {
    difficulty: 'EASY',
    question: 'How many unit types are there?',
    answer: 14,
    options: [9, 10, 11, 12, 13, 15, 16, 17, 18],
  },

  {
    difficulty: 'MEDIUM',
    question: 'What is the first name of the composer of Stormbound?',
    answer: 'Antonio',
    options: 'Anthony,Antoine,Tonio,Tonino,Nello,Nino,Totò,Toni,Tony,Antonello,Antonino,Antonuccio,Antoniano,Antuono'.split(
      ','
    ),
  },

  {
    difficulty: 'MEDIUM',
    question: 'In the kingdom order, which is the 3rd faction?',
    answer: 'Ironclad',
    options: Object.keys(FACTIONS).map(capitalise),
  },

  {
    difficulty: 'MEDIUM',
    question: 'What was the first Swarm vanilla unit?',
    answer: 'Grim Couriers',
    options: CARD_NAMES,
  },

  {
    difficulty: 'EASY',
    question: 'In the store, how many coins do you get from 50 rubies?',
    answer: 450,
    options: [300, 350, 400, 500, 550, 600],
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which forum member was Spare Dragonlings named after?',
    answer: 'aspareforyou',
    options: ['asparagus', 'asparemepls'],
  },

  {
    difficulty: 'MEDIUM',
    question: 'What is the “true” daily coin cap?',
    answer: 265,
    options: [200, 225, 250, 255, 260, 270, 280, 300],
  },

  {
    difficulty: 'EASY',
    question: 'What is the maximum amount of damage a level 5 Ubass can deal?',
    answer: 30,
    options: [15, 18, 21, 24, 27, 33, 36, 39, 42],
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which font does Stormbound use?',
    answer: 'Nunito Sans',
    options: ['Open Sans', 'Comic Sans'],
  },

  {
    difficulty: 'MEDIUM',
    question:
      'Which card idea that was submitted but didn’t win in the Create a Card Competition is implemented in the game?',
    answer: 'Snake Eyes',
    options: CARD_NAMES,
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which kingdom has the most spells?',
    answer: 'Winter',
    options: Object.keys(FACTIONS).map(capitalise),
  },

  {
    difficulty: 'MEDIUM',
    question:
      'Which card is theoretically able to get the most on-play movement, disregarding Command?',
    answer: 'Bigthrust Tigers',
    options: cards.filter(card => card.movement >= 2).map(card => card.name),
  },

  {
    difficulty: 'MEDIUM',
    question:
      'Which Shadowfen card can have 24 value in total at Level 5 at max?',
    answer: 'Amberhides',
    options: cards
      .filter(card => card.faction === 'shadowfen')
      .map(card => card.name),
  },

  {
    difficulty: 'MEDIUM',
    question:
      'Which Paladin Studios’ employee was Archdruid Earyn named after?',
    answer: 'Arano',
    options: ['Emkaem', 'Kuldotha', 'Derk'],
  },

  {
    difficulty: 'MEDIUM',
    question:
      'What is the only non-Hero unit with a special on-play sound effect?',
    answer: 'Sound Drivers',
    options: CARD_NAMES,
  },

  {
    difficulty: 'HARD',
    question: 'What is the only card that features a bow and arrow in its art?',
    answer: 'Bucks of Wasteland',
    options: CARD_NAMES,
  },

  {
    difficulty: 'HARD',
    question: 'What day was Stormbound released?',
    answer: 'September 18, 2017',
    options: Array.from({ length: 10 }, () => {
      const day = Math.floor(Math.random() * 28) + 1
      const month = Math.floor(Math.random() * 12) + 1
      const year = arrayRandom([2016, 2017, 2018])
      const date = new Date(year, month - 1, day)
      return dateFormat(date, 'mmmm dd, yyyy')
    }),
  },

  {
    difficulty: 'HARD',
    question:
      'Which card’s art features a leaf despite it not giving strength?',
    answer: 'Lich Summoners',
    options: cards
      .filter(card => !card.token && !(card.ability || '').includes('give'))
      .map(card => card.name),
  },
]
