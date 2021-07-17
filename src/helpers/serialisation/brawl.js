import {
  getShortFaction,
  getLongFaction,
  getShortMatchStatus,
  getLongMatchStatus,
  getShortVictoryBonus,
  getLongVictoryBonus,
} from '../encoding'

const serialiseMatch = match =>
  [
    match.opponentHealth || 0, // `undefined` for unknown health
    getShortFaction(match.opponentFaction), // `N` for unknown faction
    getShortMatchStatus(match.status),
    getShortVictoryBonus(match.bonus),
  ].join('')

const deserialiseMatch = string => {
  const [, health, faction, status, bonus] = string.match(
    /^(\d{1,2})([IFSWN])([WFLS])([A-Z]+)$/
  )

  return {
    opponentHealth: +health,
    opponentFaction: faction === 'N' ? undefined : getLongFaction(faction),
    status: getLongMatchStatus(status),
    bonus: getLongVictoryBonus(bonus),
  }
}

const serialiseMatches = matches => matches.map(serialiseMatch)
const deserialiseMatches = matches => matches.map(deserialiseMatch)

export default {
  serialise: matches => serialiseMatches(matches),
  deserialise: matches => deserialiseMatches(matches),
}
