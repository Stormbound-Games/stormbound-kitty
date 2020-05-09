import {
  getShortFaction,
  getLongFaction,
  getShortMatchStatus,
  getLongMatchStatus,
} from '../encoding'

const serialiseMatch = match =>
  [
    match.opponentHealth,
    getShortFaction(match.opponentFaction),
    getShortMatchStatus(match.status),
  ].join('')

const deserialiseMatch = string => {
  const [, health, faction, status] = string.match(/^(\d{1,2})([IFSW])([WFL])$/)

  return {
    opponentHealth: +health,
    opponentFaction: getLongFaction(faction),
    status: getLongMatchStatus(status),
  }
}

const serialiseMatches = matches => matches.map(serialiseMatch)
const deserialiseMatches = matches => matches.map(deserialiseMatch)

export default {
  serialise: matches => serialiseMatches(matches),
  deserialise: matches => deserialiseMatches(matches),
}
