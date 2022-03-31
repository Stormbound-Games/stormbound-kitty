import { DEFAULT_CELL, DEFAULT_CARD } from '~/constants/battle'
import arrayPad from '~/helpers/arrayPad'
import chunk from '~/helpers/chunk'
import { base64Decode, base64Encode } from '~/helpers/base64'
import { getShortFaction, getLongFaction } from '~/helpers/encoding'
import serialization from './'

const serializeBoard = board =>
  board
    .map(row =>
      row
        .map(cell =>
          cell.card.id
            ? [
                cell.strength,
                cell.card.id,
                cell.player.slice(0, 1),
                cell.level,
                cell.poisoned ? 'P' : '',
                cell.frozen ? 'F' : '',
                cell.confused ? 'C' : '',
                cell.vitalized ? 'V' : '',
                cell.disabled ? 'D' : '',
              ].join('')
            : ''
        )
        .join(',')
    )
    .join(',')

const deserializeBoard = (cardsIndex, string) => {
  const cells = arrayPad(string.split(','), 20, '', +1).map(item => {
    if (!item) {
      return { ...DEFAULT_CELL }
    }

    const [
      ,
      strength,
      id,
      player,
      level = 1,
      poisoned = '',
      frozen = '',
      confused = '',
      vitalized = '',
      disabled = '',
    ] = item.match(/^(\d+)(\w+)([RB])([1-5])?(P)?(F)?(C)?(V)?(D)?$/)

    return {
      strength: +strength,
      level: +level,
      card: cardsIndex[id],
      player: player === 'R' ? 'RED' : 'BLUE',
      poisoned: poisoned === 'P',
      vitalized: vitalized === 'V',
      frozen: frozen === 'F',
      confused: confused === 'C',
      disabled: disabled === 'D',
    }
  })

  return chunk(cells, 4)
}

const serializePlayers = ({ RED, BLUE }) =>
  `R${RED.health}${getShortFaction(RED.faction)}` +
  '-' +
  `B${BLUE.health}${getShortFaction(BLUE.faction)}`

const deserializePlayers = string => {
  const MATCH_FALLBACK = [void 0, 10, null]
  const [red, blue] = string.split('-')
  const [, redHealth, redFaction] =
    red.match(/^R(\d+)([SWIFN])$/) || MATCH_FALLBACK
  const [, blueHealth, blueFaction] =
    blue.match(/^B(\d+)([SWIFN])$/) || MATCH_FALLBACK

  return {
    RED: { health: +redHealth, faction: getLongFaction(redFaction) },
    BLUE: { health: +blueHealth, faction: getLongFaction(blueFaction) },
  }
}

const serializeSettings = ({ mana, gridMarkers }) =>
  mana + (gridMarkers ? 'M1' : 'M0')

const deserializeSettings = string => {
  // Technically mana needs to be defined, however, when clearing the field, it
  // can be undefined hence the wildcard (`*`) instead of plus (`+`).
  const [, mana, gridMarkers] = string.match(/^(\d*)(?:M([01]))?$/)

  return { mana: +mana, gridMarkers: !!+gridMarkers }
}

const deserializeBattleSimCards = (string, size) => {
  const cards = serialization.cards.deserialize(string)
  if (cards.length > size) return cards.slice(0, size)
  if (cards.length < size) return arrayPad(cards, size, { ...DEFAULT_CARD }, +1)
  return cards
}

const serializeBattle = (board, players, settings, cards) =>
  [
    serializeBoard(board),
    serializePlayers(players),
    serializeSettings(settings),
    serialization.cards.serialize(cards),
  ].join(';')

const deserializeBattle = (cardsIndex, encodedString) => {
  const string = decodeURIComponent(encodedString)
  const [board = '', players = '', settings = '', cards = ''] =
    string.split(';')

  return {
    board: deserializeBoard(cardsIndex, board),
    players: deserializePlayers(players),
    cards: deserializeBattleSimCards(cards, 4),
    ...deserializeSettings(settings),
  }
}

const battle = {
  serialize: (...chunks) => base64Encode(serializeBattle(...chunks)),
  deserialize: (cardsIndex, hash) =>
    deserializeBattle(cardsIndex, base64Decode(hash)),
}

export default battle
