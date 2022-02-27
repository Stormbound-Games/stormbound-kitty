const SAME_RACE_THRESHOLD = 3

export const SPAWNS = {
  S1: ['satyr', 1], // Doppelbocks
  S24: ['satyr', 1], // Head Start
  S16: ['satyr', 2], // Dreadfauns
  S8: ['satyr', 1], // Shady Ghoul
  I14: ['construct', 1], // Mech Workshop
  N2: ['knight', 1], // Summon Militia
  N7: ['knight', 1], // Brothers in Arms
  N59: ['knight', 2], // Edrik the Fierce
  N56: ['knight', 3], // Temple Guardians
  S12: ['dragon', 1], // Draconic Roamers
  F21: ['dragon', 2], // Broodmother Qordia
  N43: ['dragon', 6], // Ludic Matriarchs
  N49: ['raven', 2], // Avian Stalkers
  F23: ['raven', 3], // High Priestess Klaxi
  F10: ['toad', 3], // Azure Hatchers
  F8: ['toad', 4], // Rain of Frogs
}

const advice = cards => {
  const cardIds = cards.map(card => card.id)
  const hasKindredsGrace = cardIds.includes('N40')

  const deckRaces = cards.reduce((raceObj, card) => {
    if (card.race) {
      raceObj[card.race] = (raceObj[card.race] || 0) + 1
    }

    if (Object.keys(SPAWNS).includes(card.id)) {
      const [spawnRace, spawnNum] = SPAWNS[card.id]
      raceObj[spawnRace] = (raceObj[spawnRace] || 0) + spawnNum
    }
    return raceObj
  }, {})

  const maxRaceNum = Object.values(deckRaces).reduce(
    (a, b) => Math.max(a, b),
    0
  )

  // For Kindred’s Grace to be considered efficient, it requires 3 units
  // of the same race to be represented, including spawns.

  if (!hasKindredsGrace || maxRaceNum >= SAME_RACE_THRESHOLD) return null

  return {
    name: 'Inefficient Kindred’s Grace',
    description: `This deck includes Kindred’s Grace but doesn’t include enough units of the same race to be efficient. Consider including more units of the same race.`,
    highlight: ['N40'],
  }
}

export default advice
