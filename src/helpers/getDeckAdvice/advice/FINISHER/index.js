export const STABLE_FINISHERS = [
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

export const LOW_LEVEL_FINISHERS = [
  /* Windmakers */ 'I20',
  /* Draconic Roamers */ 'S12',
]

export const HIGH_LEVEL_FINISHERS = [
  /* First Mutineer */ 'N12',
  /* Rapid Mousers */ 'N71',
  /* Limelimbs */ 'F25',
  /* Restless Goats */ 'S2',
  /* Terrific Slayers */ 'N27',
  /* Wild Saberpaws */ 'N67',
]

export const DEBATABLE_FINISHERS = [
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

const advice = cards => {
  const finishers = getFinishers(cards)
  const debatableFinishers = getDebatableFinishers(cards)
  const advice = { name: 'Lack of finisher' }

  // If the deck containers a stable finisher, the advice can be skipped
  // entirely.
  if (finishers.length > 0) return null

  // Otherwise, if the deck contains a debatable finisher, we emit an advice
  // that the deck could work, but it’s not a guarantee because some finishers
  // might fall a little short or be too situational.
  if (debatableFinishers.length > 0) {
    advice.description =
      'This deck doesnt have a stable finisher, only some potential win-condition under good circumstances.  Try including one or more runners, heavy strikers or cards doing chip damage to the base.'
    advice.highlight = debatableFinishers
  } else {
    advice.description =
      'This deck doesn’t have a finisher, also known as a win-condition. Try including one or more runners, heavy strikers or cards doing chip damage to the base.'
  }

  return advice
}

export default advice
