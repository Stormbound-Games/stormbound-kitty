import {
  FACTIONS,
  UNIT_TYPES,
  CHIP_CARDS,
  RARITY_COPIES,
  RARITIES,
} from '~/constants/game'
import arrayRandom from '~/helpers/arrayRandom'
import capitalize from '~/helpers/capitalize'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import abbreviate from '~/helpers/abbreviate'
import shuffle from '~/helpers/shuffle'
import sortCards from '~/helpers/sortCards'
import indexArray from '~/helpers/indexArray'
import random from '~/helpers/random'
import { formatPreciseDate } from '~/helpers/formatDate'

const getTriviaQuestions = (cards, brawls) => {
  const cardsIndex = indexArray(cards)
  const SORTED_CARDS = cards.sort(sortCards())
  const CARD_NAMES = cards.filter(card => !card.token).map(card => card.name)
  const unique = (value, index, array) => array.indexOf(value) === index
  const range = (min, max) => [...Array(max - min).keys()].map(n => n + min)
  const rangeAround = (value, delta) => range(value - delta, value + delta)
  const NEVER_UPDATED = 'N11,N28,N32,N30,N22,N19,N16,S18'.split(',')
  const unitTypesWithOnDeath = cards
    .filter(card => (card.ability || '').includes('n death'))
    .flatMap(card => card.unitTypes)
    .filter(unique)
  const unitTypesWithoutOnDeath = UNIT_TYPES.filter(
    unitType => !unitTypesWithOnDeath.includes(unitType)
  )
  const cardsPerFaction = FACTIONS.filter(faction => faction !== 'neutral').map(
    faction => cards.filter(card => card.faction === faction).length
  )
  const maxCardsPerFaction = Math.max(...cardsPerFaction)

  return [
    {
      question:
        'Which was the first prize Kepp ever proposed in his tournament?',
      answer: 'A Steam game',
      options: ['Rubies', 'An artwork', 'A Mythic Tome', 'Nothing'],
    },

    {
      question:
        'Which was the first creative contest hosted in the Discord server?',
      answer: 'Writing contest',
      options: ['Art contest', 'Poetry contest', 'Drawing contest'],
    },

    {
      question: 'Which is the oldest kingdom?',
      answer: 'Swarm of the East',
      options: ['Winter Pact', 'Tribes of the Shadowfen', 'Ironclad Union'],
    },

    {
      question:
        'Which legendary card was in the deck of the Clash of the Generals tournament’s champion?',
      answer: 'Doctor Mia',
      options: cards
        .filter(card => card.rarity === 'legendary')
        .map(card => card.name),
    },

    {
      question: 'What is the ruby cost of an epic card in the shop?',
      answer: 20,
      options: [5, 10, 15, 25, 30],
    },

    {
      question: 'Which tool started Stormbound-Kitty?',
      answer: 'Battle sim',
      options:
        'Deck builder,Card builder,List builder,Collection manager,Deck dry-runner,Puzzles,Stories,Guides'.split(
          ','
        ),
    },

    {
      question: 'Which of his own tournaments did Kepp ever attend?',
      answer: '#1',
      options: range(2, 6).map(id => '#' + id),
    },

    {
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
      question:
        'What was the max strength Unhealthy Hysteria could effect when it was first revealed?',
      answer: 3,
      options: range(1, 10),
    },

    () => {
      const randomCard = arrayRandom(cards.filter(card => !card.token))

      return {
        question: `What is the faction of ${randomCard.name}?`,
        answer: capitalize(randomCard.faction),
        options: FACTIONS.map(capitalize),
      }
    },

    () => {
      const randomCard = arrayRandom(cards)

      return {
        question: `What is the cost of ${randomCard.name}?`,
        answer: randomCard.mana,
        options: rangeAround(randomCard.mana, 3).filter(mana => mana > 0),
      }
    },

    () => {
      const randomCard = arrayRandom(
        cards.filter(card => card.type !== 'spell')
      )
      const level = arrayRandom([1, 2, 3, 4, 5])
      const cardData = getResolvedCardData(cardsIndex, {
        id: randomCard.id,
        level,
      })

      return {
        question: `What is the strength of ${cardData.name} card at level ${level}?`,
        answer: cardData.strength,
        options: rangeAround(cardData.strength, 3).filter(
          strength => strength > 1
        ),
      }
    },

    {
      question: 'What is Olf the Hammer *not* using his hammers for?',
      answer: 'To forge weapons',
      options:
        'To win battles,To craft armor,To repair buildings,As a cushion'.split(
          ','
        ),
    },

    {
      question: 'How many quests yielding rubies are there?',
      answer: 4,
      options: range(1, 8),
    },

    {
      question: 'How green jets are displayed below Xuri?',
      answer: 6,
      options: range(1, 8),
    },

    {
      question: 'What’s the first quest you get when you start out?',
      answer: 'Exploring the Storm',
      options:
        'Fighting the Storm,Answering the Storm,Preventing the Storm,Releasing the Storm,Discovering the Storm,Taming the Storm'.split(
          ','
        ),
    },

    {
      question: 'What did Collector Mirz never collect?',
      answer: 'Trophees',
      options: ['Toys', 'Rocks', 'Wealth', 'Warriors'],
    },

    {
      question: 'What is the common symbol of giving strength?',
      answer: 'A green leaf',
      options:
        'A green cross,A green potion,A red potion,A red leaf,A red cross'.split(
          ','
        ),
    },

    {
      question: 'What did Spellbinder Zhevana study?',
      answer: 'Ancient magic',
      options: 'Arcane,Mana,Winter,Freeze,Frost,Black,Dark'
        .split(',')
        .map(name => name + ' magic'),
    },

    {
      question: 'What did Tegor swallow as a young dragonling?',
      answer: 'An enchanted die',
      options:
        'A rotten raven,A poisonous toad,A corrupted knight,A screaming goat,A burning sword,A crusty pecan-pie'.split(
          ','
        ),
    },

    {
      question: 'How many hearts are on Sweetcap Kittens’ artwork?',
      answer: 3,
      options: range(0, 6),
    },

    {
      question: 'Which hero was Edrik’s predecessor on the home menu?',
      answer: 'Wolfcloaks',
      options: cards
        .filter(card => card.unitTypes.includes('hero'))
        .map(card => card.name),
    },

    {
      question: 'Which hero is guiding new players?',
      answer: 'Edrik the Fierce',
      options: cards
        .filter(card => card.unitTypes.includes('hero'))
        .map(card => card.name),
    },

    {
      question: 'How is Head Start commonly referred to in the Discord server?',
      answer: 'Make Goat',
      options: ['Rush sheep', 'G.O.A.T airstrike', 'Brr ram', 'Beeeh'],
    },

    () => {
      const randomCard = arrayRandom(cards)

      return {
        question: `Of which card is this an anagram: “${shuffle(
          randomCard.name.toLowerCase().replace(' ', '').split('')
        ).join('')}” (spaces omitted)?`,
        answer: randomCard.name,
        options: CARD_NAMES,
      }
    },

    {
      question: 'How many skulls float around Soulcrushers’ staff?',
      answer: 3,
      options: range(0, 6),
    },

    {
      question: 'How many skulls are on Obsidian Butchers’ artwork?',
      answer: 6,
      options: range(0, 10),
    },

    {
      question: 'How many toad outlines are on Witches of the Wild’s artwork?',
      answer: 5,
      options: range(0, 10),
    },

    {
      question: 'How many triangles are visible on Tode’s cape’ embroidery?',
      answer: 10,
      options: range(5, 15),
    },

    {
      question: 'How many birds are on the Trekking Aldermen’s artwork?',
      answer: 2,
      options: range(0, 5),
    },

    {
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
      question: 'What is the top symbol on Hunter’s Vengeance artwork?',
      answer: 'A skull',
      options:
        'A toad,A construct,A pirate,A raven,A rodent,A frostling,A club,A dwarf'.split(
          ','
        ),
    },

    {
      question: 'What is the right symbol on Hunter’s Vengeance artwork?',
      answer: 'A toad',
      options:
        'A skull,A construct,A pirate,A raven,A rodent,A frostling,A club,A dwarf'.split(
          ','
        ),
    },

    {
      question: 'What is the bottom symbol on Hunter’s Vengeance artwork?',
      answer: 'A construct',
      options:
        'A skull,A toad,A pirate,A raven,A rodent,A frostling,A club,A dwarf'.split(
          ','
        ),
    },

    {
      question: 'What is the left symbol on Hunter’s Vengeance artwork?',
      answer: 'A pirate',
      options:
        'A skull,A construct,A toad,A raven,A rodent,A frostling,A club,A dwarf'.split(
          ','
        ),
    },

    {
      question: 'How many ravens are visible on Wetland Deceivers’ artwork?',
      answer: 0,
      options: range(0, 4),
    },

    {
      question:
        'What legendary card does one get from buying the Collector’s Edition bundle in the shop?',
      answer: 'Collector Mirz',
      options: cards
        .filter(card => card.rarity === 'legendary')
        .map(card => card.name),
    },

    {
      question:
        'How much did the Dragon book use to cost when it first came out?',
      answer: 200,
      options: [100, 120, 150, 175, 225, 250, 300],
    },

    {
      question:
        'Which type of tokens did Tegor the Vengeful initially spawned?',
      answer: 'Knight',
      options: UNIT_TYPES.map(capitalize),
    },

    {
      question: 'Which color has *not* been used as a pirate skin color?',
      answer: 'Orange',
      options: ['Beige', 'White', 'Blue', 'Brawn', 'Black', 'Yellow', 'Green'],
    },

    {
      question: 'How many rubies did a Kingdom book used to cost?',
      answer: 200,
      options: [25, 50, 75, 100, 125, 150, 175],
    },

    {
      question: 'How many medals do Greenwood Ancients have?',
      answer: 3,
      options: range(0, 5),
    },

    {
      question:
        'How many units are begging for mercy in Flooding the Gates’ artwork?',
      answer: 3,
      options: range(0, 5),
    },

    {
      question:
        'How many units are begging for mercy in Wetland Deceivers’ artwork?',
      answer: 4,
      options: range(0, 5),
    },

    {
      question: 'What is the weapon of predilection of knights?',
      answer: 'Lances',
      options: 'Swords,Bombs,Clubs,Daggers,Spears,Staffs,Hammers,Spells'.split(
        ','
      ),
    },

    {
      question: 'What is the weapon of predilection of dwarves?',
      answer: 'Hammers',
      options:
        'Swords,Bombs,Lances,Clubs,Daggers,Spears,Staffs,Spells,Axes'.split(
          ','
        ),
    },

    {
      question: 'What is the weapon of predilection of ravens?',
      answer: 'Staffs',
      options:
        'Swords,Bombs,Lances,Clubs,Daggers,Spears,Hammers,Spells,Scythes,Axes'.split(
          ','
        ),
    },

    {
      question: 'What is the weapon of predilection of rodents?',
      answer: 'Bombs',
      options:
        'Swords,Staffs,Lances,Clubs,Daggers,Spears,Hammers,Spells,Scythes,Axes'.split(
          ','
        ),
    },

    {
      question: 'What is the weapon of predilection of satyrs?',
      answer: 'Spears',
      options:
        'Swords,Staffs,Lances,Clubs,Daggers,Bombs,Hammers,Spells,Scythes,Axes'.split(
          ','
        ),
    },

    {
      question: 'What is the weapon of predilection of toads?',
      answer: 'Axes',
      options:
        'Swords,Staffs,Lances,Clubs,Daggers,Bombs,Hammers,Spells,Scythes,Spears'.split(
          ','
        ),
    },

    {
      question: 'What is the weapon of predilection of undead?',
      answer: 'Scythes',
      options:
        'Swords,Staffs,Lances,Clubs,Daggers,Bombs,Hammers,Spells,Axes,Spears'.split(
          ','
        ),
    },

    {
      question: 'How many ravens are visible on Marked as Prey’s artwork?',
      answer: 9,
      options: range(5, 15),
    },

    {
      question: 'How many flying toads are visible on Rain of Frogs’ artwork?',
      answer: 5,
      options: range(2, 8),
    },

    {
      question: 'What does the Crimson Sentry hold in its right hand?',
      answer: 'A shield',
      options: [
        'An axe',
        'A sword',
        'A staff',
        'A stick',
        'A dagger',
        'A club',
      ],
    },

    {
      question: 'Which card’s artwork features a fork?',
      answer: 'Toxic Sacrifice',
      options: CARD_NAMES,
    },

    {
      question: 'Which of Project PH03-Nix’ arm is a cannon?',
      answer: 'His right arm',
      options: ['His left arm'],
    },

    {
      question:
        'What are the outlines on the background of Booming Professors’ artwork?',
      answer: 'Flames',
      options: ['Constructs', 'Rodents', 'Structures'],
    },

    {
      question: 'How many cards are potions?',
      answer: 3,
      options: range(2, 6),
    },

    {
      question: 'What is floating on top of The Hearth?',
      answer: 'A helmet',
      options: ['A leaf', 'A flame', 'A shadow', 'A sword', 'A shield'],
    },

    {
      question: 'How many snakes are visible in Siren of the Seas’ hair?',
      answer: 4,
      options: range(1, 9),
    },

    {
      question: 'How many ravens are flying behind Avian Stalkers?',
      answer: 3,
      options: range(1, 6),
    },

    {
      question: 'How many cards are floating above Archdruid Earyn?',
      answer: 6,
      options: range(4, 10),
    },

    {
      question: 'How many dice are Snake Eyes juggling with?',
      answer: 5,
      options: range(3, 9),
    },

    {
      question: 'How many blades are visible on Bladestorm’s artwork?',
      answer: 10,
      options: range(5, 12),
    },

    {
      question: 'How to enter the Emerald Towers?',
      answer: 'A ladder',
      options: ['Stairs', 'The front door', 'A gate'],
    },

    {
      question: 'What is the maximum amount of spawns for Edrik the Fierce?',
      answer: 5,
      options: range(1, 6),
    },

    {
      question:
        'Of which unit type are Beards of Crowglyphs showing visual elements?',
      answer: 'Dragon',
      options: UNIT_TYPES.filter(type => type !== 'elder').map(capitalize),
    },

    {
      question: 'What are Seasick Bouncers holding in their right hand?',
      answer: 'A gun',
      options: [
        'A sword',
        'A bomb',
        'A shield',
        'A potion',
        'A knife',
        'A club',
      ],
    },

    {
      question:
        'Which feline was illustrated after internet legend Grumpy Cat?',
      answer: 'Razor-Sharp Lynxes',
      options: cards
        .filter(card => card.unitTypes.includes('feline'))
        .map(card => card.name),
    },

    {
      question: 'How many cards increase the base health?',
      answer: 3,
      options: range(1, 5),
    },

    {
      question: 'Are “on death” effects triggered when attacking the base?',
      answer: 'Some',
      options: ['No', 'Yes'],
    },

    {
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

    () => ({
      question: 'Which card cannot do direct damage to the base?',
      answer: arrayRandom(cards.filter(card => !CHIP_CARDS.includes(card.id)))
        .name,
      options: CHIP_CARDS.map(id => cardsIndex[id]).map(card => card.name),
    }),

    () => ({
      question: 'Which card can do direct damage to the base?',
      answer: cardsIndex[arrayRandom(CHIP_CARDS)].name,
      options: cards
        .filter(card => !CHIP_CARDS.includes(card.id))
        .map(card => card.name),
    }),

    {
      question: 'How many Elders are there?',
      answer: cards.filter(
        card => !card.token && card.unitTypes.includes('elder')
      ).length,
      options: rangeAround(
        cards.filter(card => !card.token && card.unitTypes.includes('elder'))
          .length,
        10
      ),
    },

    {
      question: 'How many heroes are there?',
      answer: cards.filter(card => card.unitTypes.includes('hero')).length,
      options: rangeAround(
        cards.filter(card => card.unitTypes.includes('hero')).length,
        5
      ),
    },

    {
      question: cardsPerFaction.every(count => count === cardsPerFaction[0])
        ? 'How many cards per faction are there?'
        : 'How many cards are there in the faction with the most cards?',
      answer: maxCardsPerFaction,
      options: range(maxCardsPerFaction - 20, maxCardsPerFaction + 20),
    },

    {
      question: 'What is the cell resolution order?',
      answer: 'Top-to-bottom, left-to-right',
      options: [
        'Top-to-bottom, right-to-left',
        'Bottom-to-top, left-to-right',
        'Bottom-to-top, right-to-left',
      ],
    },

    {
      question: 'How does confusion work?',
      answer: '50% chance to move on each side',
      options: [
        '33% chance to move forward, 33% chance to move on each side',
        '60% chance to move forward, 20% chance to move on each side',
        '50% chance to move forward, 25% chance to move on each side',
        '25% chance to move on any bordering tile',
        '12.5% chance to move on any surrounding tile',
      ],
    },

    {
      question:
        'When Beasts of Terror attacks a friendly unit, which units will be affected by its ability?',
      answer: 'Enemy units',
      options: ['All units', 'Friendly units', 'No units'],
    },

    {
      question: 'Which unit type is Powder Tower built by?',
      answer: 'Pirate',
      options: UNIT_TYPES.map(capitalize),
    },

    {
      question: 'Which card was made from the Create-a-Card competition?',
      answer: 'Harvesters of Souls',
      options: CARD_NAMES,
    },

    {
      question:
        'How many rare cards used to come in the Collector’s Edition bundle?',
      answer: 34,
      options: [22, 24, 26, 28, 30, 32, 36, 38, 40, 42, 44],
    },

    {
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
      question: 'How many unit types are there?',
      answer: UNIT_TYPES.length,
      options: rangeAround(UNIT_TYPES.length, 5),
    },

    {
      question: 'In the store, how many coins do you get from 50 rubies?',
      answer: 450,
      options: [300, 350, 400, 500, 550, 600],
    },

    {
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
      question: 'How many different books are there?',
      answer: 6,
      options: range(4, 8),
    },

    {
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
      question: 'What is the name of the Winter paid book?',
      answer: 'Icebound Saga',
      options: ['Frozen Saga', 'Frost Saga', 'Snowflake Saga', 'Icecold Saga'],
    },

    {
      question:
        'What is the maximum amount of damage a level 5 Ubass can deal?',
      answer: 24,
      options: [15, 18, 21, 30, 27, 33, 36, 39, 42],
    },

    {
      question:
        'What is the correct order of Sharpfist Exiles’ strengths from levels 1-5?',
      answer: '2/4/4/7/7',
      options: [
        '2/3/4/5/7',
        '2/4/5/6/7',
        '2/4/5/5/7',
        '2/4/5/6/6',
        '2/3/4/6/7',
      ],
    },

    {
      question: 'In which field does Mia *not* have a doctorate?',
      answer: 'Engineering',
      options: ['Science', 'Arts', 'Ministry', 'Education'],
    },

    {
      question: 'What was the original name of PH03-nix?',
      answer: 'Prolonged Hero 03',
      options:
        'Progressing,Persisting,Pervasive,Patient,Peaceful,Passionate,Placid,Personable'
          .split(',')
          .map(name => name + ' Hero 03'),
    },

    {
      question:
        'Which of these Discord moderators used to work for Paladin Studios?',
      answer: 'Kuldotha',
      options: ['Kahrua', 'Kitty', 'Kepp', 'Brzoza', 'Frozen'],
    },

    {
      question:
        'What are the displayed odds of a card from a Mythic Tome being epic?',
      answer: '70%',
      options: ['50%', '55%', '60%', '65%', '66.66%', '75%', '80%', '85%'],
    },

    {
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
      question: 'What is the Siren of the Seas looking for?',
      answer: 'True love',
      options: 'Her harp,Pirates,The Captain,Snakes,Music,Inspiration'.split(
        ','
      ),
    },

    {
      question: 'What is the name of the popular Stormbound saga by Zyries?',
      answer: 'Eastern Heat',
      options:
        'Easter Heat,Eastern Feet,Eastern Cheat,Eastern Meet,Kepp killed Kitty'.split(
          ','
        ),
    },

    {
      question: 'What is the name of the Satyr Brawl?',
      answer: 'Self-control',
      options:
        'Self-sustained,Crazy Goats,Goat2Hell,2Fast2Goat,Self-contained'.split(
          ','
        ),
    },

    () => {
      const rarity = arrayRandom(RARITIES)

      return {
        question: `How many Fusion Stones does it cost to craft a ${rarity} card?`,
        answer: RARITY_COPIES[rarity].stonesForMissing,
        options: rangeAround(RARITY_COPIES[rarity].stonesForMissing, 5),
      }
    },

    {
      question: 'How many neutral spells are there?',
      answer: cards.filter(
        card => card.faction === 'neutral' && card.type === 'spell'
      ).length,
      options: rangeAround(
        cards.filter(
          card => card.faction === 'neutral' && card.type === 'spell'
        ).length,
        5
      ),
    },

    {
      question: 'How many structures are in the game?',
      answer: cards.filter(card => card.type === 'structure').length,
      options: rangeAround(
        cards.filter(card => card.type === 'structure').length,
        5
      ),
    },

    {
      question: 'How many cards have a drain ability?',
      answer: cards.filter(card => (card.ability || '').includes('drain'))
        .length,
      options: rangeAround(
        cards.filter(card => (card.ability || '').includes('drain')).length,
        3
      ),
    },

    {
      question:
        'Which of these cards was revealed by Kitty on Stormbound-Kitty?',
      answer: 'Bigthrust Tigers',
      options: cards
        .filter(card => card.unitTypes.includes('feline'))
        .map(card => card.name),
    },

    {
      question: 'How many times were Cabin Girls updated?',
      answer: 0,
      options: range(1, 5),
    },

    () => ({
      question:
        'Which one of these cards was updated at least once since released?',
      answer: arrayRandom(
        cards.filter(card => !card.token && !NEVER_UPDATED.includes(card.id))
      ).name,
      options: NEVER_UPDATED.map(id => cardsIndex[id].name),
    }),

    {
      question:
        'Which faction is the only one with a card that was never updated since the release?',
      answer: 'Swarm',
      options: ['Winter', 'Shadowfen', 'Ironclad'],
    },

    {
      question: 'How many cards have “FS” as initials?',
      answer: cards.filter(card => abbreviate(card.name) === 'FS').length,
      options: rangeAround(
        cards.filter(card => abbreviate(card.name) === 'FS').length,
        2
      ),
    },

    {
      question: 'Which of these dragons was *not* named after a player?',
      answer: 'Beasts of Terror',
      options:
        'Broken Earth Drakes,Broodmother Qordia,Conflicted Drakes,Dangerous Suitors,Draconic Roamer,Dreadful Keepers,Greengale Serpents,Ludic Matriarchs,Spare Dragonling,Sunbeam Serpents,Yowling Weavers'.split(
          ','
        ),
    },

    {
      question: 'Which faction has the most structures?',
      answer: 'Ironclad',
      options: ['Swarm', 'Shadowfen', 'Winter'],
    },

    {
      question: 'Which faction has the most 2-movement units?',
      answer: 'Winter',
      options: ['Swarm', 'Shadowfen', 'Ironclad'],
    },

    {
      question: 'How many cards can push units?',
      answer: 5,
      options: range(3, 7),
    },

    {
      question: 'Which of one these names is *not* an official card’s name?',
      answer: 'Wardens',
      options:
        'Boatswain,Bravefoot,Corsair,Cult of the Sky,Dead Wanderer,Elite Deathguards,Frenzied Troops,Gunner,Jade Speedster,Lonely Witch,Lost Faun,Makeshifter,Mudgrinders,Plain Helper,Privateer,Rough Patchers,Saplings,Silent Rimes,Sleetrunners,Sparkling'.split(
          ','
        ),
    },

    {
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
        question:
          'Which of these cards’ ability does *not* contain a full-stop (`.`)?',
        answer: randomCard.name,
        options: cardsWithFullStop.map(card => card.name),
      }
    },

    {
      question:
        'Which legendary card was originally fetured in the Stormbound app icon?',
      answer: 'Olf the Hammer',
      options: cards
        .filter(card => card.unitTypes.includes('hero'))
        .map(card => card.name),
    },

    {
      question: 'How many ranks were there before the leagues were introduced?',
      answer: 30,
      options: '10,12,24,25,28,30,40,50'.split(','),
    },

    {
      question: 'Which card was first revelaed after a social media voting?',
      answer: 'Unstable Build',
      options: ['Blessed with Brawn', 'Heliotroopers', 'Head Start'],
    },

    {
      question:
        'How many coins did Fusion Stones use to cost in the daily shop?',
      answer: 50,
      options: '25,30,35,40,45,55,60,65,70,75,80,85,90,95,100,125,150'.split(
        ','
      ),
    },

    {
      question: 'What is the most mana Toxic Sacrifice ever cost?',
      answer: 3,
      options: range(2, 7),
    },

    {
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
      question:
        'What is the maximum amount of strength Sharpfist Exiles can gain at Level 5, *not* counting its base strength?',
      answer: 76,
      options: [48, 52, 56, 60, 64, 68, 72, 80, 84, 88, 92, 96],
    },

    {
      question:
        'If you play Needle Blast which brings the opponent to 0, but also hits the opponent’s Booming Professors and brings your base to 0, who would win?',
      answer: 'Opponent',
      options: ['You', 'Tie', 'Game crashes'],
    },

    {
      question: 'How much damage could Needle Blast do when first released?',
      answer: 7,
      options: range(4, 10),
    },

    {
      question: 'What is the first name of the composer of Stormbound?',
      answer: 'Antonio',
      options:
        'Anthony,Antoine,Tonio,Tonino,Nello,Nino,Totò,Toni,Tony,Antonello,Antonino,Antonuccio,Antoniano,Antuono'.split(
          ','
        ),
    },

    {
      question: 'Who are Ludic Matriarchs named after?',
      answer: 'Ludo88',
      options: Array.from({ length: 50 }, () => 'Ludo' + random(10, 99)),
    },

    {
      question: 'In the kingdom order, which is the 3rd faction?',
      answer: 'Ironclad',
      options: FACTIONS.map(capitalize),
    },

    {
      question: 'What was the first Swarm vanilla unit?',
      answer: 'Grim Couriers',
      options: cards
        .filter(card => card.faction === 'swarm' && card.type === 'unit')
        .map(card => card.name),
    },

    {
      question: 'Which forum member was Spare Dragonlings named after?',
      answer: 'aspareforyou',
      options: ['asparagus', 'asparemepls', 'asparedr', 'c-asper'],
    },

    {
      question: 'What is the “true” daily coin cap?',
      answer: 265,
      options: [200, 225, 250, 255, 260, 270, 280, 300],
    },

    {
      question: 'Which font does Stormbound use?',
      answer: 'Nunito Sans',
      options: ['Open Sans', 'Comic Sans', 'Bound Sans'],
    },

    {
      question:
        'Which card idea that was submitted but didn’t win in the Create-a-Card competition is implemented in the game?',
      answer: 'Snake Eyes',
      options: CARD_NAMES,
    },

    {
      question: 'Which kingdom has the most spells?',
      answer: 'Winter',
      options: ['Ironclad', 'Swarm', 'Shadowfen'],
    },

    {
      question:
        'Which card is theoretically able to get the most on-play movement, disregarding Command?',
      answer: 'Bigthrust Tigers',
      options: cards.filter(card => card.movement >= 2).map(card => card.name),
    },

    () => ({
      question:
        'Which other unit types were possible to vote for for the community created card Harvesters of Souls?',
      answer: 'Pirate and Raven',
      options: Array.from({ length: 20 }, () => {
        const randomUnitType = arrayRandom(UNIT_TYPES)

        return [
          randomUnitType,
          arrayRandom(
            UNIT_TYPES.filter(unitType => unitType !== randomUnitType)
          ),
        ]
          .map(capitalize)
          .join(' and ')
      }),
    }),

    {
      question:
        'Which Shadowfen card can have 24 strength value in total at Level 5 at max?',
      answer: 'Amberhides',
      options: cards
        .filter(card => card.faction === 'shadowfen')
        .map(card => card.name),
    },

    {
      question:
        'Which Paladin Studios’ employee was Archdruid Earyn named after?',
      answer: 'Arano',
      options: ['Emkaem', 'Kuldotha', 'Derk', 'CeeSharp'],
    },

    {
      question:
        'What is the only non-Hero unit with a special on-play sound effect?',
      answer: 'Sound Drivers',
      options: CARD_NAMES,
    },

    {
      question:
        'Which structure shares its name with a Kongregate forum moderator?',
      answer: 'Trueshot Post',
      options: cards
        .filter(card => card.type === 'structure' && card.id !== 'T12')
        .map(card => card.name),
    },

    {
      question: 'How many different Brawls are there?',
      answer: brawls.length,
      options: rangeAround(brawls.length, 5),
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
      question:
        'How many coins did it use to cost to reach the 10th Brawl milestone with no losses before the June 2021 revamp?',
      answer: 13890,
      options: Array.from(
        { length: 20 },
        () => Math.round(random(10000, 15000) / 10) * 10
      ),
    },

    {
      question: 'How many cards are there?',
      answer: 188,
      options: range(175, 200),
    },

    {
      question:
        'Which one of these cards’ abilities was *not* enhanced to impact structures in a balance change?',
      answer: 'Victors of the Melee',
      options: ['Devastators', 'Trueshot Post', 'Boomstick Officers'],
    },

    {
      question:
        'What is the only card that features a bow and arrow in its art?',
      answer: 'Bucks of Wasteland',
      options: CARD_NAMES,
    },

    {
      question: 'What day was Stormbound released?',
      answer: 'September 18, 2017',
      options: Array.from({ length: 10 }, () => {
        const day = Math.floor(Math.random() * 28) + 1
        const month = Math.floor(Math.random() * 12) + 1
        const year = arrayRandom([2016, 2017, 2018])
        const date = new Date(year, month - 1, day)

        return formatPreciseDate(date)
      }),
    },

    {
      question:
        'Which card’s art features a leaf despite it *not* giving strength?',
      answer: 'Lich Summoners',
      options: cards
        .filter(card => !card.token && !(card.ability || '').includes('give'))
        .map(card => card.name),
    },

    {
      question:
        'Which platform was *not* used to disclose one of the wild cats?',
      answer: 'Twitter',
      options: 'Stormbound-Kitty,Stormbound Wiki,YouTube,Discord,Twitch'.split(
        ','
      ),
    },

    {
      question: 'Which was the first Elder to be revealed?',
      answer: 'Trekking Aldermen',
      options: cards
        .filter(card => card.unitTypes.includes('elder'))
        .map(card => card.name),
    },

    {
      question: 'Which of these cards has the longest ability?',
      answer: cards
        .filter(card => card.ability)
        .map(card => getResolvedCardData(cardsIndex, { id: card.id, level: 5 }))
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
        .filter(
          card =>
            card.id !== 'W20' && card.id !== 'I26' && card.type !== 'spell'
        )
        .map(card => getResolvedCardData(cardsIndex, { id: card.id, level }))
        .sort((a, b) =>
          a.strength > b.strength ? -1 : a.strength < b.strength ? +1 : 0
        )

      return {
        question: `Which card has the highest strength at level ${level}?`,
        answer: cardsByStrength[0].name,
        options: cardsByStrength.slice(0, 10).map(card => card.name),
      }
    },

    {
      question:
        'What was the name of the book that contained exclusively Feline cards?',
      answer: 'Guide to Cats',
      options: [
        'Furry Diary',
        'Book of Purrfection',
        'Encyclopædia of Cats',
        'Kitty Kit',
      ],
    },

    {
      question:
        'What is the maximum effective strength of Blood Ministers at level 5 considering their ability?',
      answer: 64,
      options: [10, 38, ...rangeAround(64, 5)],
    },

    {
      question:
        'What was the reward given out to all players during the first “Eye of the Tempest“ Brawl?',
      answer: 'Confinement',
      options: CARD_NAMES,
    },

    () => {
      const rarity = arrayRandom(RARITIES)
      const count = cards.filter(
        card => card.faction === 'winter' && card.rarity === rarity
      ).length

      return {
        question: `How many ${rarity} cards are there in each faction?`,
        answer: count,
        options: rangeAround(count, 3),
      }
    },

    () => ({
      question:
        'Which unit type does *not* have a card with an “on death” effect?',
      answer: capitalize(arrayRandom(unitTypesWithoutOnDeath)),
      options: unitTypesWithOnDeath.map(capitalize),
    }),

    {
      question:
        'Which one of these units’ ability does *not* trigger when forced to attack a friendly unit?',
      answer: 'Laurus, King in Exile',
      options: ['Haversters of Souls', 'Beasts of Terror', 'Yowling Weavers'],
    },

    {
      question: 'Which rodent does *not* have a stick of dynamite?',
      answer: 'Armed Schemers',
      options: ['Boomstick Officers', 'Agents in Charge', 'Windmakers'],
    },

    {
      question: 'Which dwarf is *not* holding a hammer?',
      answer: 'Hearthguards',
      options:
        'Snowmasons,Mystwives,Rockworkers,Wolfcloaks,Chillbeards,Fleshmenders,Sleetstompers'.split(
          ','
        ),
    },

    {
      question: 'Which toad is *not* holding an axe?',
      answer: 'Sharpfist Exiles',
      options:
        'Salty Outcasts,Brood Sages,Crimson Sentry,Limelimbs,Azure Hatchers,Amberhides,Obsidian Butchers'.split(
          ','
        ),
    },

    {
      question: 'Which undead does *not* have red horns on their head?',
      answer: 'Lasting Remains',
      options: cards
        .filter(card => card.unitTypes.includes('undead') && card.id !== 'N38')
        .map(card => card.name),
    },

    {
      question: 'What book did Noble book replace in the shop?',
      answer: 'Splendid Book',
      options: 'Superb Book,Savant’s Book,Scholar’s Book,Sacred Book'.split(
        ','
      ),
    },

    {
      question: 'Which hero’s loading screen text rhymes?',
      answer: 'Lady Rime',
      options: cards
        .filter(card => card.unitTypes.includes('hero'))
        .map(card => card.name),
    },

    {
      question: 'Which construct does *not* move on wheels?',
      answer: 'Finite Loopers',
      options: 'Personal Servers,Destructobots,Linked Golems,Operators'.split(
        ','
      ),
    },

    {
      question: 'What was the teaser for the first Feline update?',
      answer: 'A box',
      options:
        'A watermelon,A heart,A cucumber,A carton of milk,A ball of wool'.split(
          ','
        ),
    },

    {
      question: 'According to its flavor text, what was Unstable Build?',
      answer: 'A centre of knowledge',
      options:
        'A Construct factory,A military base,A laboratory,An observatory,A dance-hall'.split(
          ','
        ),
    },

    {
      question: 'What is on Edrik’s shield?',
      answer: 'A crown',
      options: 'A diamond,A circle,Nothing,A snake,A dragon,Spikes'.split(','),
    },

    {
      question: 'Which card appears in the “Invalid Deck” dialog box?',
      answer: 'Dubious Hags',
      options: CARD_NAMES,
    },

    {
      question: 'Which card appears in the “Quit Game” dialog box?',
      answer: 'Broken Earth Drake',
      options: CARD_NAMES,
    },

    {
      question: 'Which unit type cannot spawn units?',
      answer: 'Frostling',
      options: 'Knight,Raven,Rodent,Undead,Dragon,Toad,Satyr,Construct'.split(
        ','
      ),
    },

    {
      question:
        'What is the name of the Brawl that released Prime Oracle Bragda?',
      answer: 'Heroic Deeds',
      options: brawls.map(brawl => brawl.name),
    },

    {
      question: 'Which card is commonly nicknamed “Hairdryer”?',
      answer: 'Spellbinder Zhevana',
      options: CARD_NAMES,
    },

    {
      question: 'Which unit is not shown in the “Select Campaign” page?',
      answer: 'Wisp Cloud',
      options: ['Forgotten Souls', 'Operators', 'Untamed Cultists'],
    },

    {
      question: 'Which Dragon does not have wings on their back?',
      answer: 'Greengale Serpents',
      options: ['Wandering Wyrms', 'Draconic Roamers', 'Broken Earth Drakes'],
    },

    {
      question: 'Which faction does *not* have a “sunglasses” emote?',
      answer: 'Satyr',
      options: ['Construct', 'Toad', 'Frostling'],
    },

    {
      question:
        'When an Elder attacks Green Prototypes and survives, whose effect will trigger first?',
      answer: 'Green Prototypes’',
      options: ['The Elder’s', 'At random', 'None'],
    },

    {
      question: 'Which Pirate does not have a gun?',
      answer: 'Snake Eyes',
      options: 'Northsea Dog,Lucky Charmers,Bluesail Raiders'.split(','),
    },

    {
      question: 'Which card cannot be played with an empty board?',
      answer: 'Flaming Stream',
      options: 'Hunter’s Vengeance,Fortification Tonic,Dark Harvest'.split(','),
    },

    {
      question: 'Which of the following criteria cannot be used to sort cards?',
      answer: 'Ability',
      options: ['Strength', 'Speed', 'Name', 'Mana', 'Level'],
    },

    {
      question: 'Which cards have the darkest background?',
      answer: 'Structures',
      options: ['Units', 'Spells'],
    },

    {
      question: 'Which faction has the most units?',
      answer: 'Shadowfen',
      options: FACTIONS.filter(faction => faction !== 'neutral').map(
        capitalize
      ),
    },

    {
      question: 'Which was the first temple to be released?',
      answer: 'Temple of Focus',
      options: cards
        .filter(card => card.name.startsWith('Temple'))
        .map(card => card.name),
    },

    {
      question: 'What are the colors of Tegor’s flames?',
      answer: 'White, red, green',
      options:
        'Red, green, blue;Yellow, orange, red;Yellow, red, green;Black and white'.split(
          ';'
        ),
    },

    {
      question: 'What is the color of Amberhides’ eyes?',
      answer: 'Red',
      options: 'Red,Green,Blue,Yellow,Orange,White,Brown'.split(','),
    },

    {
      question: 'What is the color of Amberhides’ tongue?',
      answer: 'Blue',
      options: 'Red,Green,Blue,Yellow,Orange,White,Brown'.split(','),
    },

    {
      question: 'What is the flag of the Powder Tower?',
      answer: 'A skull',
      options: 'A pirate,A rodent,A knight,A sword,A chest,A bomb'.split(','),
    },

    {
      question: 'How many arms does Lady Rime have?',
      answer: 4,
      options: rangeAround(4, 2),
    },

    {
      question: 'How many ravens are flying over Marked as Prey?',
      answer: 8,
      options: rangeAround(8, 4),
    },

    {
      question: 'How many ravens are flying around Avian Stalkers?',
      answer: 3,
      options: rangeAround(3, 3),
    },

    {
      question: 'Which number is not rolled by Snake Eyes’ dice?',
      answer: 1,
      options: [2, 3, 4, 5, 6],
    },
  ]
}

export default getTriviaQuestions
