import {
  getShortFaction,
  getLongFaction,
  getShortMatchStatus,
  getLongMatchStatus,
  getShortVictoryBonus,
  getLongVictoryBonus,
} from '~/helpers/encoding'

const serializeMatch = match =>
  [
    match.opponentHealth || 0, // `undefined` for unknown health
    getShortFaction(match.opponentFaction), // `N` for unknown faction
    getShortMatchStatus(match.status),
    getShortVictoryBonus(match.bonus),
  ].join('')

const deserializeMatch = string => {
  const [, health, faction, status, bonus] = string.match(
    /^(\d{1,2})([IFSWN])([WFDLS])([A-Z]+)?$/
  )

  return {
    opponentHealth: +health,
    opponentFaction: faction === 'N' ? undefined : getLongFaction(faction),
    status: getLongMatchStatus(status),
    bonus: getLongVictoryBonus(bonus),
  }
}

const serializeMatches = matches => matches.map(serializeMatch)
const deserializeMatches = matches => matches.map(deserializeMatch)

const brawl = {
  serialize: matches => serializeMatches(matches),
  deserialize: matches => deserializeMatches(matches),
}

export default brawl
