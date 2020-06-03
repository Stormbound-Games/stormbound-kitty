import dateFormat from 'dateformat'
import { FACTIONS, RACES, CHIP_CARDS } from '../../../constants/game'
import cards from '../../../data/cards'
import decks from '../../../data/decks'
import arrayRandom from '../../../helpers/arrayRandom'
import capitalise from '../../../helpers/capitalise'
import getRawCardData from '../../../helpers/getRawCardData'

const CARD_NAMES = cards.filter(card => !card.token).map(card => card.name)
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const range = (min, max) => [...Array(max - min).keys()].map(n => n + min)
const randomAuthor = arrayRandom(decks).author

export default [
  {
    difficulty: 'EASY',
    question: 'What is Olf the Hammer *not* using his hammers for?',
    answer: 'To forge weapons',
    options: [
      'To win battles',
      'To craft armor',
      'To repair buildings',
      'As a cushion',
    ],
  },

  {
    difficulty: 'EASY',
    question: 'What did Collector Mirz never collect?',
    answer: 'Trophees',
    options: ['Toys', 'Rocks', 'Wealth', 'Warriors'],
  },

  {
    difficulty: 'EASY',
    question: 'Are “on death” effects triggered when crossing the base line?',
    answer: 'Yes',
    options: ['No', 'It depends', 'Some'],
  },

  {
    difficulty: 'EASY',
    question: 'What impact has Doctor Mia’s ability at level 3?',
    answer: 'Surrouding structures',
    options: [
      'Bordering structures',
      'All structures',
      'One structure',
      'Two structures',
      'Three structures',
    ],
  },

  {
    difficulty: 'EASY',
    question: 'Which card cannot do direct damage to the base?',
    answer: arrayRandom(cards.filter(card => !CHIP_CARDS.includes(card.id)))
      .name,
    options: CHIP_CARDS.map(getRawCardData).map(card => card.name),
  },

  {
    difficulty: 'EASY',
    question: 'How many Elders are there?',
    answer: cards.filter(card => card.elder).length,
    options: range(
      cards.filter(card => card.elder).length - 10,
      cards.filter(card => card.elder).length + 10
    ),
  },

  {
    difficulty: 'EASY',
    question: 'How many Heroes are there?',
    answer: cards.filter(card => card.hero).length,
    options: range(
      cards.filter(card => card.hero).length - 10,
      cards.filter(card => card.hero).length + 10
    ),
  },

  {
    difficulty: 'EASY',
    question: 'How many cards per faction are there?',
    answer: cards.filter(card => card.faction === 'winter').length,
    options: range(20, 60),
  },

  {
    difficulty: 'EASY',
    question: 'What is the cell resolution order?',
    answer: 'Top-to-bottom, left-to-right',
    options: [
      'Top-to-bottom, right-to-left',
      'Bottom-to-top, left-to-right',
      'Bottom-to-top, right-to-left',
    ],
  },

  {
    difficulty: 'EASY',
    question: 'How does confusion work?',
    answer: '33% chance to move forward, 33% chance to move on each side',
    options: [
      '60% chance to move forward, 20% chance to move on each side',
      '50% chance to move forward, 25% chance to move on each side',
      '25% chance to move on any bordering tile',
      '12.5% chance to move on any surrounding tile',
    ],
  },

  {
    difficulty: 'EASY',
    question:
      'When Beasts of Terror attacks a friendly unit, which units will be affected by its ability?',
    answer: 'Enemy units',
    options: ['All units', 'Friendly units', 'No units'],
  },

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
    difficulty: 'EASY',
    question: 'In the store, how many coins do you get from 50 rubies?',
    answer: 450,
    options: [300, 350, 400, 500, 550, 600],
  },

  {
    difficulty: 'EASY',
    question: 'What is the maximum amount of damage a level 5 Ubass can deal?',
    answer: 30,
    options: [15, 18, 21, 24, 27, 33, 36, 39, 42],
  },

  {
    difficulty: 'EASY',
    question:
      'What is the correct order of Sharpfist Exiles’ strengths from levels 1-5?',
    answer: '2/4/4/7/7',
    options: ['2/3/4/5/7', '2/4/5/6/7', '2/4/5/5/7', '2/4/5/6/6', '2/3/4/6/7'],
  },

  {
    difficulty: 'EASY',
    question: 'What is the name of Shadowfen’s premade deck?',
    answer: 'Counter Deck',
    options: decks.map(deck => deck.name + ' Deck'),
  },

  {
    difficulty: 'EASY',
    question: 'In which field does Mia *not* have a doctorate?',
    answer: 'Engineering',
    options: ['Science', 'Arts', 'Ministry', 'Education'],
  },

  {
    difficulty: 'EASY',
    question: 'What was the original name of PH03-nix',
    answer: 'Prolonged Hero 03',
    options: 'Progressing,Persisting,Pervasive,Patient,Peaceful,Passionate,Placid,Personable'
      .split(',')
      .map(name => name + ' Hero 03'),
  },

  {
    difficulty: 'EASY',
    question: 'What is Queen of Herds sometimes doing by accident?',
    answer: 'Burying the living',
    options: [
      'Loving goats',
      'Burying the dead',
      'Raising the living',
      'Converting satyrs',
    ],
  },

  {
    difficulty: 'EASY',
    question: 'What is the Siren of the Seas looking for?',
    answer: 'True love',
    options: [
      'Her harp',
      'Pirates',
      'The Captain',
      'Snakes',
      'Music',
      'Inspiration',
    ],
  },

  {
    difficulty: 'MEDIUM',
    question:
      'Which legendary card was originally fetured in the Stormbound app icon?',
    answer: 'Olf the Hammer',
    options: cards.filter(card => card.hero).map(card => card.name),
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many ranks were there before the leagues were introduced?',
    answer: 35,
    options: '10,12,24,25,28,30,40,50'.split(','),
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which card was first revelaed after a social media voting?',
    answer: 'Unstable Build',
    choices: [
      'Blessed with Brawn',
      'Unstable build',
      'Heliotroopers',
      'Head Start',
    ],
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many coins did Fusion Stones use to cost in the daily shop?',
    answer: 50,
    options: '25,30,35,40,45,55,60,65,70,75,80,85,90,95,100,125,150'.split(','),
  },

  {
    difficulty: 'MEDIUM',
    question: 'What is the most mana Toxic Sacrifice ever cost?',
    answer: 3,
    options: range(2, 7),
  },

  {
    difficulty: 'MEDIUM',
    question: 'What is Counselor Ahmi’s advice?',
    answer: 'Simply do everything I tell you to as fast as possible.',
    options: [
      'Just do everything I tell you to as fast as possible.',
      'Just do everything I tell you to as quickly as possible.',
      'Simply do everything I tell you to as quickly as possible.',
      'Just do everything I tell you to as quick as possible.',
      'Simply do everything I tell you to as quick as possible.',
    ],
  },

  {
    difficulty: 'MEDIUM',
    question:
      'Which two people have tied for the most Stormbound championship titles?',
    answer: 'HanooSt + BluePhoenix',
    options: Array.from({ length: 20 }, () =>
      [
        randomAuthor,
        arrayRandom(decks.filter(deck => deck.author !== randomAuthor)).author,
      ].join(' + ')
    ),
  },

  {
    difficulty: 'MEDIUM',
    question:
      'What is the maximum amount of strength Sharpfist Exiles can gain at Level 5, not counting its base strength?',
    answer: 76,
    options: [48, 52, 56, 60, 64, 68, 72, 80, 84, 88, 92, 96],
  },

  {
    difficulty: 'MEDIUM',
    question:
      'If you play Needle Blast which brings the opponent to 0, but also hits the opponent’s Booming Professors and brings your base to 0, who would win?',
    answer: 'Opponent',
    options: ['You', 'Tie', 'Game crashes'],
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
    question:
      'What is the correct spelling of the community member’s name that Ludic Matriarchs is named after?',
    answer: 'Ludo88',
    options: Array.from({ length: 50 }, () => 'Ludo' + random(10, 99)),
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
    options: cards
      .filter(card => card.faction === 'swarm' && card.type === 'unit')
      .map(card => card.name),
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
    options: ['Ironclad', 'Swarm', 'Shadowfen'],
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
    difficulty: 'MEDIUM',
    question: 'Which structure is the Kongregate Forum mod named after?',
    answer: 'Trueshot Post',
    options: cards
      .filter(card => card.type === 'structure')
      .map(card => card.name),
  },

  {
    difficulty: 'HARD',
    question:
      'Who did Shades beat in the finals of a DGL Stormbound tournament?',
    answer: 'Emkaem',
    options: decks
      .filter(deck => deck.author !== 'Shades')
      .map(deck => deck.author),
  },

  {
    difficulty: 'HARD',
    question: 'What is the formula used to reweigh cards in the deck?',
    answer: 'f(w)=⌊w×1.6+1',
    options: [
      'f(w)=⌈w×1.6-1',
      'f(w)=⌊w×1.6-1',
      'f(w)=⌈w×1.6+1',
      'f(w)=⌊w×1.6+1',
      'f(w)=⌈w×0.16+1',
      'f(w)=⌊w×0.16+1',
    ],
  },

  {
    difficulty: 'HARD',
    question:
      'How many coins would it cost to get to the 10th Brawl milestone with no losses?',
    answer: 13890,
    options: Array.from(
      { length: 20 },
      () => Math.round(random(10000, 15000) / 10) * 10
    ),
  },

  {
    difficulty: 'HARD',
    question: 'How many cards are there?',
    answer: 188,
    options: range(175, 200),
  },

  {
    difficulty: 'HARD',
    question:
      'Which one of these cards’ abilities were not enhanced to impact structures in a balance change?',
    answer: 'Victors of the Melee',
    options: ['Devastators', 'Trueshot Post', 'Boomstick Officers'],
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
