import dateFormat from 'dateformat'
import {
  FACTIONS,
  RACES,
  CHIP_CARDS,
  RARITY_COPIES,
} from '../../../constants/game'
import { BRAWLS } from '../../../constants/brawl'
import cards from '../../../data/cards'
import decks from '../../../data/decks'
import arrayRandom from '../../../helpers/arrayRandom'
import capitalise from '../../../helpers/capitalise'
import getRawCardData from '../../../helpers/getRawCardData'
import getResolvedCardData from '../../../helpers/getResolvedCardData'
import abbreviate from '../../../helpers/abbreviate'
import shuffle from '../../../helpers/shuffle'
import sortCards from '../../../helpers/sortCards'

const SORTED_CARDS = cards.sort(sortCards())
const CARD_NAMES = cards.filter(card => !card.token).map(card => card.name)
const unique = (value, index, array) => array.indexOf(value) === index
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const range = (min, max) => [...Array(max - min).keys()].map(n => n + min)
const randomRace = arrayRandom(Object.keys(RACES))
const rangeAround = (value, delta) => range(value - delta, value + delta)
const NEVER_UPDATED = [
  'N11',
  'N28',
  'N32',
  'N21',
  'N30',
  'N22',
  'N19',
  'N24',
  'N16',
  'S18',
]

export default [
  {
    difficulty: 'HARD',
    question: 'Which was the first prize Kepp ever proposed in his tournament?',
    answer: 'A Steam game',
    options: ['Rubies', 'An artwork', 'A Mythic book', 'Nothing'],
  },

  {
    difficulty: 'HARD',
    question:
      'Which was the first creative contest hosted in the Discord server?',
    answer: 'Writing contest',
    options: ['Art contest', 'Poetry contest', 'Drawing contest'],
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which is the oldest kingdom?',
    answer: 'Swarm of the East',
    options: ['Winter Pact', 'Tribes of the Shadowfen', 'Ironclad Union'],
  },

  {
    difficulty: 'HARD',
    question:
      'Which legendary card was in the deck of the Clash of the Generals tournament’s champion?',
    answer: 'Doctor Mia',
    options: cards
      .filter(card => card.rarity === 'legendary')
      .map(card => card.name),
  },

  {
    difficulty: 'EASY',
    question: 'What is the cost of an epic card in the shop?',
    answer: 20,
    options: [5, 10, 15, 25, 30],
  },

  {
    difficulty: 'EASY',
    question: 'Which tool started Stormbound-Kitty?',
    answer: 'Battle sim',
    options: [
      'Deck builder',
      'Card builder',
      'List builder',
      'Collection manager',
      'Deck dry-runner',
      'Puzzles',
      'Stories',
      'Guides',
    ],
  },

  {
    difficulty: 'HARD',
    question:
      'Who won the first drawing-based contest hosted in the Discord server?',
    answer: 'YoungestMammal',
    options: decks.map(story => story.author).filter(unique),
  },

  {
    difficulty: 'HARD',
    question: 'With whom did Kepp first started hosting tournaments?',
    answer: 'Derpyologist',
    options: decks.map(deck => deck.author).filter(unique),
  },

  {
    difficulty: 'HARD',
    question: 'Which of his own tournaments did Kepp ever attend?',
    answer: '#1',
    options: range(2, 6).map(id => '#' + id),
  },

  {
    difficulty: 'EASY',
    question: 'What is the last neutral card?',
    answer: SORTED_CARDS.filter(
      card => !card.token && card.faction === 'neutral'
    ).pop().name,
    options: SORTED_CARDS.filter(
      card => !card.token && card.faction === 'neutral'
    )
      .slice(-10)
      .map(card => card.name),
  },

  {
    difficulty: 'MEDIUM',
    question:
      'What was the max strength Unhealthy Hysteria could effect when it was first revealed?',
    answer: 3,
    options: range(1, 10),
  },

  () => {
    const randomCard = arrayRandom(cards.filter(card => card.type === 'unit'))

    return {
      difficulty: 'EASY',
      question: `What is the race of ${randomCard.name}?`,
      answer: capitalise(randomCard.race),
      options: Object.keys(RACES).map(capitalise),
    }
  },

  () => {
    const randomCard = arrayRandom(cards.filter(card => !card.token))

    return {
      difficulty: 'EASY',
      question: `What is the faction of ${randomCard.name}?`,
      answer: capitalise(randomCard.faction),
      options: Object.keys(FACTIONS).map(capitalise),
    }
  },

  () => {
    const randomCard = arrayRandom(cards)
    const level = arrayRandom([1, 2, 3, 4, 5])
    const cardData = getResolvedCardData({ id: randomCard.id, level })

    return {
      difficulty: 'EASY',
      question: `What is the cost of ${cardData.name} at level ${level}?`,
      answer: cardData.mana,
      options: range(0, 10),
    }
  },

  () => {
    const randomCard = arrayRandom(cards.filter(card => card.type !== 'spell'))
    const level = arrayRandom([1, 2, 3, 4, 5])
    const cardData = getResolvedCardData({ id: randomCard.id, level })

    return {
      difficulty: 'EASY',
      question: `What is the strength of ${cardData.name} card at level ${level}?`,
      answer: cardData.strength,
      options: range(0, 20),
    }
  },

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
    question: 'How many quests yielding rubies are there?',
    answer: 4,
    options: range(1, 8),
  },

  {
    difficulty: 'HARD',
    question: 'How green jets are displayed below Xuri?',
    answer: 6,
    options: range(1, 8),
  },

  {
    difficulty: 'MEDIUM',
    question: 'What’s the first quest you get when you start out?',
    name: 'Exploring the Storm',
    options: [
      'Fighting the Storm',
      'Answering the Storm',
      'Preventing the Storm',
      'Releasing the Storm',
      'Discovering the Storm',
      'Taming the Storm',
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
    question: 'What is the common symbol of giving strength?',
    answer: 'A green leaf',
    options: [
      'A green cross',
      'A green potion',
      'A red potion',
      'A red leaf',
      'A red cross',
    ],
  },

  {
    difficulty: 'EASY',
    question: 'What did Spellbinder Zhevana study?',
    answer: 'Ancient magic',
    options: 'Arcane,Mana,Winter,Freeze,Frost,Black,Dark'
      .split(',')
      .map(name => name + ' magic'),
  },

  {
    difficulty: 'EASY',
    question: 'What did Tegor swallow as a young dragonling?',
    answer: 'An enchanted die',
    options: [
      'A rotten raven',
      'A poisonous toad',
      'A corrupted knight',
      'A screaming goat',
      'A burning sword',
      'A crusty pecan-pie',
    ],
  },

  {
    difficulty: 'EASY',
    question: 'How many hearts are on Sweetcap Kittens’ artwork?',
    answer: 3,
    options: range(0, 6),
  },

  {
    difficulty: 'EASY',
    question: 'Which hero was Edrik’s predecessor on the home menu?',
    answer: 'Wolfcloaks',
    options: cards.filter(card => card.hero).map(card => card.name),
  },

  () => {
    const randomCard = arrayRandom(cards)

    return {
      difficulty: 'EASY',
      question: `Of which card is this an anagram: “${shuffle(
        randomCard.name.toLowerCase().split('')
      ).join('')}”?`,
      answer: randomCard.name,
      options: CARD_NAMES,
    }
  },

  {
    difficulty: 'EASY',
    question: 'How many skulls float around Soulcrushers’ staff?',
    answer: 3,
    options: range(0, 6),
  },

  {
    difficulty: 'HARD',
    question: 'How many skulls are on Obsidian Butchers’ artwork?',
    answer: 6,
    options: range(0, 10),
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many toad outlines are on Witches of the Wild’s artwork?',
    answer: 5,
    options: range(0, 10),
  },

  {
    difficulty: 'EASY',
    question: 'How many triangles are visible on Tode’s cape’ embroidery?',
    answer: 10,
    options: range(5, 15),
  },

  {
    difficulty: 'EASY',
    question: 'How many birds are on the Trekking Aldermen’s artwork?',
    answer: 2,
    options: range(0, 5),
  },

  {
    difficulty: 'HARD',
    question: 'What are the four symbols on Hunter’s Vengeance artwork?',
    answer: 'A skull, a toad, a construct and a pirate',
    options: [
      'A skull, a raven, a construct and a knight',
      'A skull, a frostling, a rodent and a pirate',
      'A skull, a rodent, a dwarf and a toad',
      'A skull, a construct, a raven and a knight',
      'A skull, a rodent, a frostling, and a knight',
    ],
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many ravens are visible on Wetland Deceivers’ artwork?',
    answer: 0,
    options: range(0, 4),
  },

  {
    difficulty: 'EASY',
    question:
      'What legendary card does one get from buying the Collector’s Edition bundle in the shop?',
    answer: 'Collector Mirz',
    options: cards
      .filter(card => card.rarity === 'legendary')
      .map(card => card.name),
  },

  {
    difficulty: 'MEDIUM',
    question:
      'How much did the Dragon book use to cost when it first came out?',
    answer: 200,
    options: [100, 120, 150, 175, 225, 250, 300],
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which type of tokens did Tegor the Vengeful initially spawned?',
    answer: 'Knight',
    options: Object.keys(RACES).map(capitalise),
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which color has *not* been used as a pirate skin color?',
    answer: 'Orange',
    options: ['Beige', 'White', 'Blue', 'Brawn', 'Black', 'Yellow', 'Green'],
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many rubies did a Kingdom book used to cost?',
    answer: 200,
    options: [25, 50, 75, 100, 125, 150, 175],
  },

  {
    difficulty: 'EASY',
    question: 'How many medals do Greenwood Ancients have?',
    answer: 3,
    options: range(0, 5),
  },

  {
    difficulty: 'EASY',
    question:
      'How many units are begging for mercy in Flooding the Gates’ artwork?',
    answer: 3,
    options: range(0, 5),
  },

  {
    difficulty: 'EASY',
    question:
      'How many units are begging for mercy in Wetland Deceivers’ artwork?',
    answer: 4,
    options: range(0, 5),
  },

  {
    difficulty: 'EASY',
    question: 'What is the weapon of predilection of knights?',
    answer: 'Lances',
    options: ['Swords', 'Clubs', 'Daggers', 'Staffs', 'Spells'],
  },

  {
    difficulty: 'HARD',
    question: 'How many ravens are visible on Marked as Prey’s artwork?',
    answer: 9,
    options: range(5, 15),
  },

  {
    difficulty: 'EASY',
    question: 'How many flying toads are visible on Rain of Frogs’ artwork?',
    answer: 5,
    options: range(2, 8),
  },

  {
    difficulty: 'MEDIUM',
    question: 'What does the Crimson Sentry hold in its right hand?',
    answer: 'A shield',
    options: ['An axe', 'A sword', 'A staff', 'A stick', 'A dagger', 'A club'],
  },

  {
    difficulty: 'EASY',
    question: 'Which card’s artwork features a fork?',
    answer: 'Toxic Sacrifice',
    options: CARD_NAMES,
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which of Project PH03-Nix’ arm is a cannon?',
    answer: 'His right arm',
    options: ['His left arm'],
  },

  {
    difficulty: 'EASY',
    question:
      'What are the outlines on the background of Booming Professors’ artwork?',
    answer: 'Flames',
    options: ['Constructs', 'Rodents', 'Structures'],
  },

  {
    difficulty: 'EASY',
    question: 'How many cards are potions?',
    answer: 3,
    options: range(2, 6),
  },

  {
    difficulty: 'EASY',
    question: 'What is floating on top of The Hearth?',
    answer: 'A helmet',
    options: ['A leaf', 'A flame', 'A shadow', 'A sword', 'A shielf'],
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many snakes are visible in Siren of the Seas’ hair?',
    answer: 4,
    options: range(1, 9),
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many ravens are flying behind Avian Stalkers?',
    answer: 3,
    options: range(1, 6),
  },

  {
    difficulty: 'EASY',
    question: 'How many cards are floating above Archdruid Earyn?',
    answer: 6,
    options: range(4, 10),
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many dice are Snake Eyes juggling with?',
    answer: 5,
    options: range(3, 9),
  },

  {
    difficulty: 'EASY',
    question: 'How many blades are visible on Bladestorm’s artwork?',
    answer: 10,
    options: range(5, 12),
  },

  {
    difficulty: 'EASY',
    question: 'How to enter the Emerald Towers?',
    answer: 'A ladder',
    options: ['Stairs', 'The front door', 'A gate'],
  },

  {
    difficulty: 'EASY',
    question: 'What is the maximum amount of spawns for Edrik the Fierce?',
    answer: 3,
    options: range(1, 5),
  },

  {
    difficulty: 'EASY',
    question: 'Of which race are Beards of Crowglyphs showing visual elements?',
    answer: 'Dragon',
    options: Object.keys(RACES).map(capitalise),
  },

  {
    difficulty: 'EASY',
    question: 'What are Seasick Bouncers holding in their right hand?',
    answer: 'A gun',
    options: ['A sword', 'A bomb', 'A shield', 'A potion', 'A knife', 'A club'],
  },

  {
    difficulty: 'EASY',
    question: 'Which feline was illustrated after internet legend Grumpy Cat?',
    answer: 'Razor-Sharp Lynxes',
    options: cards
      .filter(card => card.race === 'feline')
      .map(card => card.name),
  },

  {
    difficulty: 'EASY',
    question: 'How many cards increase the base health?',
    answer: 2,
    options: range(1, 5),
  },

  {
    difficulty: 'MEDIUM',
    question: 'Are “on death” effects triggered when attacking the base?',
    answer: 'Some',
    options: ['No', 'Yes'],
  },

  {
    difficulty: 'EASY',
    question: 'What impact has Doctor Mia’s ability at level 3?',
    answer: 'Surrounding structures',
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
    options: rangeAround(cards.filter(card => card.elder).length, 10),
  },

  {
    difficulty: 'EASY',
    question: 'How many Heroes are there?',
    answer: cards.filter(card => card.hero).length,
    options: rangeAround(cards.filter(card => card.hero).length, 10),
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many cards per faction are there?',
    answer: cards.filter(card => card.faction === 'winter').length,
    options: range(20, 60),
  },

  {
    difficulty: 'MEDIUM',
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
    answer: 'Pirate',
    options: Object.keys(RACES).map(capitalise),
  },

  {
    difficulty: 'EASY',
    question: 'Which card was made from the Create-a-Card competition?',
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
    question: 'How many unit races are there?',
    answer: Object.keys(RACES).length,
    options: rangeAround(Object.keys(RACES).length, 5),
  },

  {
    difficulty: 'MEDIUM',
    question: 'In the store, how many coins do you get from 50 rubies?',
    answer: 450,
    options: [300, 350, 400, 500, 550, 600],
  },

  {
    difficulty: 'MEDIUM',
    question: 'What is the name of the Swarm paid book?',
    answer: 'Shredded Journal',
    options: [
      'Sand Journal',
      'Journal of Death',
      'Lost Journal',
      'Eastern Journal',
    ],
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many different books are there?',
    answer: 6,
    options: range(4, 8),
  },

  {
    difficulty: 'MEDIUM',
    question: 'What are the 4 possibility for fusion stones in books?',
    answer: '5/12/25/50',
    options: [
      '5/10/15/20',
      '5/15/30/60',
      '5/10/20/40',
      '6/12/24/36',
      '6/12/24/48',
    ],
  },

  {
    difficulty: 'MEDIUM',
    question: 'What is the name of the Shadowfen paid book?',
    answer: 'Tribal Tome',
    options: [
      'Tome of the Tribe',
      'Shadow Tome',
      'Shady Tome',
      'Poisonous Tome',
    ],
  },

  {
    difficulty: 'MEDIUM',
    question: 'What is the name of the Ironclad paid book?',
    answer: 'Engineer’s Manual',
    options: [
      'Rodent’s Manual',
      'Construct’s Manual',
      'Manual of Instructions',
      'Manual of Gears',
    ],
  },

  {
    difficulty: 'MEDIUM',
    question: 'What is the name of the Winter paid book?',
    answer: 'Icebound Saga',
    options: ['Frozen Saga', 'Frost Saga', 'Snowflake Saga', 'Icecold Saga'],
  },

  {
    difficulty: 'MEDIUM',
    question: 'What is the maximum amount of damage a level 5 Ubass can deal?',
    answer: 30,
    options: [15, 18, 21, 24, 27, 33, 36, 39, 42],
  },

  {
    difficulty: 'MEDIUM',
    question:
      'What is the correct order of Sharpfist Exiles’ strengths from levels 1-5?',
    answer: '2/4/4/7/7',
    options: ['2/3/4/5/7', '2/4/5/6/7', '2/4/5/5/7', '2/4/5/6/6', '2/3/4/6/7'],
  },

  {
    difficulty: 'EASY',
    question: 'What is the name of the Shadowfen premade deck?',
    answer: 'Counter Deck',
    options: decks.map(deck => deck.name + ' Deck'),
  },

  {
    difficulty: 'EASY',
    question: 'What is the name of the Ironclad premade deck?',
    answer: 'Operator’s Deck',
    options: decks.map(deck => deck.name + ' Deck'),
  },

  {
    difficulty: 'EASY',
    question: 'In which field is Mia *not* a minister?',
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
    question:
      'Which of these Discord moderators used to work for Paladin Studios?',
    answer: 'Kuldotha',
    options: ['Kahrua', 'Kitty', 'Kepp', 'Brzoza', 'Frozen'],
  },

  {
    difficulty: 'EASY',
    question: 'What are the odds of pulling an epic card in a Mythic book?',
    answer: '70%',
    options: ['50%', '55%', '60%', '65%', '66.66%', '75%', '80%', '85%'],
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
    difficulty: 'EASY',
    question: 'What is the name of the popular Stormbound saga by Zyries?',
    answer: 'Eastern Heat',
    options: 'Easter Heat,Eastern Feet,Eastern Cheat,Eastern Meet,Kepp killed Kitty'.split(
      ','
    ),
  },

  {
    difficulty: 'EASY',
    question: 'What is the name of the Satyr Brawl?',
    answer: 'Self-control',
    options: 'Self-sustained,Crazy Goats,Goat2Hell,2Fast2Goat,Self-container'.split(
      ','
    ),
  },

  {
    difficulty: 'EASY',
    question: 'How many Fusion Stones does it cost to craft an epic card?',
    answer: 25,
    options: [12, 18, 20, 22, 30, 35, 50],
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many neutral spells are there?',
    answer: cards.filter(
      card => card.faction === 'neutral' && card.type === 'spell'
    ).length,
    options: rangeAround(
      cards.filter(card => card.faction === 'neutral' && card.type === 'spell')
        .length,
      5
    ),
  },

  {
    difficulty: 'HARD',
    question: 'How many structures are in the game?',
    answer: cards.filter(card => card.type === 'structure').length,
    options: rangeAround(
      cards.filter(card => card.type === 'structure').length,
      5
    ),
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many cards have a drain ability?',
    answer: cards.filter(card => (card.ability || '').includes('drain')).length,
    options: rangeAround(
      cards.filter(card => (card.ability || '').includes('drain')).length,
      3
    ),
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which of these cards was revealed by Kitty on Stormbound-Kitty?',
    answer: 'Bigthrust Tiger',
    options: cards
      .filter(card => card.race === 'feline')
      .map(card => card.name),
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many times were Cabin Girls updated?',
    answer: 0,
    options: range(1, 5),
  },

  {
    difficulty: 'MEDIUM',
    question:
      'Which one of these cards was updated at least once since released?',
    answer: cards
      .filter(card => !card.token && !NEVER_UPDATED.includes(card.id))
      .map(card => card.name),
    options: NEVER_UPDATED.map(getRawCardData).map(card => card.name),
  },

  {
    difficulty: 'MEDIUM',
    question:
      'Which faction is the only one with a card that was never updated since the release?',
    answer: 'Swarm',
    options: ['Winter', 'Shadowfen', 'Ironclad'],
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many cards have “FS” as initials?',
    answer: cards.filter(card => abbreviate(card.name) === 'FS').length,
    options: rangeAround(
      cards.filter(card => abbreviate(card.name) === 'FS').length,
      2
    ),
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which of these dragons was not named after a player?',
    answer: 'Beasts of Terror',
    options: [
      'Broken Earth Drakes',
      'Broodmother Qordia',
      'Conflicted Drakes',
      'Dangerous Suitors',
      'Draconic Roamer',
      'Dreadful Keepers',
      'Greengale Serpents',
      'Ludic Matriarchs',
      'Spare Dragonling',
      'Sunbeam Serpents',
      'Yowling Weavers',
    ],
  },

  {
    difficulty: 'EASY',
    question: 'Which faction has the most structures?',
    answer: 'Ironclad',
    options: ['Swarm', 'Shadowfen', 'Winter'],
  },

  {
    difficulty: 'EASY',
    question: 'Which faction has the most 2-movement units?',
    answer: 'Winter',
    options: ['Swarm', 'Shadowfen', 'Ironclad'],
  },

  {
    difficulty: 'EASY',
    question: 'How many cards can push units?',
    answer: 5,
    options: range(3, 7),
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which of one these names is not an official card’s name?',
    answer: 'Wardens',
    options: 'Boatswain,Bravefoot,Corsair,Cult of the Sky,Dead Wanderer,Elite Deathguards,Frenzied Troops,Gunner,Jade Speedster,Lonely Witch,Lost Faun,Makeshifter,Mudgrinders,Plain Helper,Privateer,Rough Patchers,Saplings,Silent Rimes,Sleetrunners,Sparkling,'.split(
      ','
    ),
  },

  {
    difficulty: 'MEDIUM',
    question:
      'What is the lowest base health someone has reached Diamond with?',
    answer: 13,
    options: range(10, 20),
  },

  () => {
    const cardsWithFullStop = cards
      .filter(card => card.ability)
      .filter(card => card.ability.includes('. '))
    const randomCard = arrayRandom(
      cards
        .filter(card => card.ability)
        .filter(card => !card.ability.includes('. '))
    )

    return {
      difficulty: 'MEDIUM',
      question: 'Which of these cards’ ability does not contain a full stop?',
      answer: randomCard.name,
      options: cardsWithFullStop.map(card => card.name),
    }
  },

  {
    difficulty: 'EASY',
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
    options: [
      'Blessed with Brawn',
      'Unstable build',
      'Heliotroopers',
      'Head Start',
    ],
  },

  {
    difficulty: 'HARD',
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
    difficulty: 'HARD',
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

  () => {
    const authors = decks.map(deck => deck.author).filter(unique)
    const randomAuthor = arrayRandom(authors)

    return {
      difficulty: 'MEDIUM',
      question:
        'Which two people have tied for the most Stormbound championship titles?',
      answer: 'HanooSt and BluePhoenix',
      options: Array.from({ length: 20 }, () =>
        [
          randomAuthor,
          arrayRandom(authors.filter(deck => deck.author !== randomAuthor)),
        ].join(' and ')
      ),
    }
  },

  {
    difficulty: 'HARD',
    question:
      'What is the maximum amount of strength Sharpfist Exiles can gain at Level 5, not counting its base strength?',
    answer: 76,
    options: [48, 52, 56, 60, 64, 68, 72, 80, 84, 88, 92, 96],
  },

  {
    difficulty: 'HARD',
    question:
      'If you play Needle Blast which brings the opponent to 0, but also hits the opponent’s Booming Professors and brings your base to 0, who would win?',
    answer: 'Opponent',
    options: ['You', 'Tie', 'Game crashes'],
  },

  {
    difficulty: 'HARD',
    question: 'How much damage could Needle Blast do when first released?',
    answer: 10,
    options: range(5, 12),
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
      'Which card idea that was submitted but didn’t win in the Create-a-Card competition is implemented in the game?',
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
      'Which other races were possible to vote for for the community created card Harvesters of Souls?',
    answer: 'Pirate and Raven',
    options: Array.from({ length: 20 }, () =>
      [
        randomRace,
        arrayRandom(Object.keys(RACES).filter(race => race !== randomRace)),
      ]
        .map(capitalise)
        .join(' and ')
    ),
  },

  {
    difficulty: 'HARD',
    question:
      'Which Shadowfen card can have 24 strength value in total at Level 5 at max?',
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
    question: 'Which structure is named after the Kongregate forum moderator?',
    answer: 'Trueshot Post',
    options: cards
      .filter(card => card.type === 'structure')
      .map(card => card.name),
  },

  {
    difficulty: 'MEDIUM',
    question: 'How many different Brawls are there?',
    answer: BRAWLS.length,
    options: rangeAround(BRAWLS.length, 5),
  },

  {
    different: 'HARD',
    question:
      'How many copies of a non-missing rare card are required to bring it level 5?',
    answer: RARITY_COPIES.rare.copies.reduce((a, b) => a + b, 0),
    options: rangeAround(
      RARITY_COPIES.rare.copies.reduce((a, b) => a + b, 0),
      5
    ),
  },

  {
    difficulty: 'HARD',
    question:
      'Who did Shades beat in the finals of a DGL Stormbound tournament?',
    answer: 'Emkaem',
    options: decks
      .filter(deck => deck.author !== 'Shades')
      .filter(unique)
      .map(deck => deck.author),
  },

  {
    difficulty: 'HARD',
    question: 'What is the formula used to reweigh cards in the deck?',
    answer: 'f(w) = ⌊ w × 1.6 + 1',
    options: [
      'f(w) = ⌈ w × 1.6 - 1',
      'f(w) = ⌊ w × 1.6 - 1',
      'f(w) = ⌈ w × 1.6 + 1',
      'f(w) = ⌊ w × 1.6 + 1',
      'f(w) = ⌈ w × 1.6',
      'f(w) = ⌊ w × 1.6',
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
    difficulty: 'MEDIUM',
    question: 'How many cards are there?',
    answer: 188,
    options: range(175, 200),
  },

  {
    difficulty: 'HARD',
    question:
      'Which one of these cards’ abilities was *not* enhanced to impact structures in a balance change?',
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

  {
    difficulty: 'HARD',
    question: 'What are the odds of pulling Fusion Stones from a Mythic book?',
    answer: '17.86%',
    options: ['18.76%', '16.78%', '16.87%', '17.68%', '17.86%'],
  },

  {
    difficulty: 'MEDIUM',
    question: 'Which platform was *not* used to disclose one of the wild cats?',
    answer: 'Twitter',
    options: [
      'Stormbound-Kitty',
      'Stormbound Wiki',
      'YouTube',
      'Discord',
      'Twitch',
    ],
  },

  {
    difficulty: 'HARD',
    question: 'Which was the first Elder to be revealed?',
    answer: 'Trekking Aldermen',
    options: cards.filter(card => card.elder).map(card => card.name),
  },

  {
    difficulty: 'EASY',
    question: 'Which of these cards has the longest ability?',
    answer: cards
      .filter(card => card.ability)
      .map(card => getResolvedCardData({ id: card.id, level: 5 }))
      .reduce((a, b) =>
        a.ability.replace(/\*/g, '').length >
        b.ability.replace(/\*/g, '').length
          ? a
          : b
      ).name,
    options: cards.filter(card => card.ability).map(card => card.name),
  },

  () => {
    const level = arrayRandom([1, 2, 3, 4, 5])
    const cardsByStrength = cards
      .filter(card => card.type !== 'spell')
      .map(card => getResolvedCardData({ id: card.id, level }))
      .sort((a, b) =>
        a.strength > b.strength ? -1 : a.strength < b.strength ? +1 : 0
      )

    return {
      difficulty: 'MEDIUM',
      question: `Which card has the highest strength at level ${level}?`,
      answer: cardsByStrength[0].name,
      options: cardsByStrength.slice(0, 10).map(card => card.name),
    }
  },
]
