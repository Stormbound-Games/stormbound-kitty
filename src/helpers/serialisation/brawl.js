import {
  getShortFaction,
  getLongFaction,
  getShortMatchStatus,
  getLongMatchStatus,
} from '../encoding'

const serialiseMatch = match =>
  [
    match.opponentHealth || 0, // `undefined` for unknown health
    getShortFaction(match.opponentFaction), // `N` for unknown faction
    getShortMatchStatus(match.status),
  ].join('')

const deserialiseMatch = string => {
  const [, health, faction, status] = string.match(
    /^(\d{1,2})([IFSWN])([WFLS])$/
  )

  return {
    opponentHealth: +health,
    opponentFaction: faction === 'N' ? undefined : getLongFaction(faction),
    status: getLongMatchStatus(status),
  }
}

const serialiseMatches = matches => matches.map(serialiseMatch)
const deserialiseMatches = matches => matches.map(deserialiseMatch)

export default {
  serialise: matches => serialiseMatches(matches),
  deserialise: matches => deserialiseMatches(matches),
}
