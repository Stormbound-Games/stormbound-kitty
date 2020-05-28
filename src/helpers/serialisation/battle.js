import { DEFAULT_CELL, DEFAULT_CARD } from '../../constants/battle'
import arrayPad from '../arrayPad'
import chunk from '../chunk'
import getRawCardData from '../getRawCardData'
import { base64Decode, base64Encode } from '../base64'
import { getShortFaction, getLongFaction } from '../encoding'
import serialisation from './'

const serialiseBoard = board =>
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
              ].join('')
            : ''
        )
        .join(',')
    )
    .join(',')

const deserialiseBoard = string => {
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
    ] = item.match(/^(\d+)(\w+)([RB])([1-5])?(P)?(F)?(C)?$/)

    return {
      strength: +strength,
      level: +level,
      card: getRawCardData(id),
      player: player === 'R' ? 'RED' : 'BLUE',
      poisoned: poisoned === 'P',
      frozen: frozen === 'F',
      confused: confused === 'C',
    }
  })

  return chunk(cells, 4)
}

const serialisePlayers = ({ RED, BLUE }) =>
  `R${RED.health}${getShortFaction(RED.faction)}` +
  '-' +
  `B${BLUE.health}${getShortFaction(BLUE.faction)}`

const deserialisePlayers = string => {
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

const serialiseSettings = ({ mana, gridMarkers }) =>
  mana + (gridMarkers ? 'M1' : 'M0')

const deserialiseSettings = string => {
  // Technically mana needs to be defined, however, when clearing the field, it
  // can be undefined hence the wildcard (`*`) instead of plus (`+`).
  const [, mana, gridMarkers] = string.match(/^(\d*)(?:M([01]))?$/)

  return { mana: +mana, gridMarkers: !!+gridMarkers }
}

const deserialiseBattleSimCards = (string, size) =>
  arrayPad(serialisation.cards.deserialise(string), size, DEFAULT_CARD, +1)

const deserialiseHand = (handString, cardsString) => {
  // Board was created before it was possible to have a full deck, so the `hand`
  // part of the serialised string is actually undefined instead of being an
  // empty string. In that case, we need to consider the 4 first cards from the
  // deck to be the hand.
  if (handString === undefined) {
    return deserialiseBattleSimCards(cardsString, 4)
      .filter(card => !!card.id)
      .map(card => card.id)
  }

  return handString.split(',').slice(0, 4).filter(Boolean)
}

const serialiseBattle = (board, players, settings, { cards, hand }) =>
  [
    serialiseBoard(board),
    serialisePlayers(players),
    serialiseSettings(settings),
    serialisation.cards.serialise(cards),
    hand.join(','),
  ].join(';')

const deserialiseBattle = encodedString => {
  const string = decodeURIComponent(encodedString)
  const [
    board = '',
    players = '',
    settings = '',
    cards = '',
    hand /* Explicitly no fallback here */,
  ] = string.split(';')

  return {
    board: deserialiseBoard(board),
    players: deserialisePlayers(players),
    cards: deserialiseBattleSimCards(cards, 12),
    hand: deserialiseHand(hand, cards),
    ...deserialiseSettings(settings),
  }
}

export default {
  serialise: (...chunks) => base64Encode(serialiseBattle(...chunks)),
  deserialise: hash => deserialiseBattle(base64Decode(hash)),
}
