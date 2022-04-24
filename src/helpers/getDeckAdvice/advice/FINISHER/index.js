export const STABLE_FINISHERS = [
  // RUNNERS
  'N28', // Warfront Runners
  'N30', // Bluesail Raiders
  'N39', // Hearthguards
  'N46', // Tegor the Vengeful
  'N52', // Salty Outcasts
  'N55', // Joust Champions
  'N58', // Siren of the Seas
  'N65', // Razor-Sharp Lynxes
  'I12', // Chaotic Pupil
  'I25', // Agents in Charge
  'W17', // Wolfcloaks
  'W18', // Fleshmenders
  'W22', // Chillbeards
  'W23', // Olf The Hammer
  'W26', // Sleetstompers
  'S17', // Grim Couriers
  'S23', // Lasting Remains
  'S26', // Obliterators
  'F17', // Obsidian Butchers

  // CHIP
  'N35', // Ubass the Hunter
  'N44', // Needle Blast
  'S18', // Pillars of Doom
  'S22', // Vindicators
  'S15', // Dark Harvest
  'F28', // Hairy Chestnuts
  'I19', // Siege Assembly
  'I28', // Booming Professors
  'W21', // Visions of the Grove

  // MISC
  'S6', // Forgotten Souls
  'S20', // Herald’s Hymn
]

export const LOW_LEVEL_FINISHERS = [
  'I20', // Windmakers
  'S12', // Draconic Roamers
]

export const HIGH_LEVEL_FINISHERS = [
  'N12', // First Mutineer
  'N71', // Rapid Mousers
  'F25', // Limelimbs
  'S2', // Restless Goats
  'N27', // Terrific Slayers
  'N67', // Wild Saberpaws
]

export const DEBATABLE_FINISHERS = [
  'N45', // Powder Tower
  'N61', // Hair-Raising Cats
  'S13', // Mischiefs
  'I7', // Greengale Serpents
  'I15', // Overchargers
  'N51', // Dangerous Suiters
  'W10', // Lady Rime
  'N42', // Lucky Charmers
  'F23', // High Priestess Klaxi
  'S27', // Petrified Fossils
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
