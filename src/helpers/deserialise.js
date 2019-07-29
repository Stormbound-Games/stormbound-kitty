import chunk from './chunk'
import { DEFAULT_CELL, DEFAULT_CARD } from '../constants/battle'
import getRawCardData from './getRawCardData'
import resolveAbility from './resolveAbility'
import {
  getLongFaction,
  getLongRace,
  getLongRarity,
  getLongType,
  getLongCurrency
} from './encoding'

const MATCH_FALLBACK = [void 0, 10, null]

const deserialisePlayers = string => {
  const [red, blue] = string.split('-')
  const [, redHealth, redFaction] =
    red.match(/^R(\d+)([SWIFN])$/) || MATCH_FALLBACK
  const [, blueHealth, blueFaction] =
    blue.match(/^B(\d+)([SWIFN])$/) || MATCH_FALLBACK

  return {
    RED: { health: +redHealth, faction: getLongFaction(redFaction) },
    BLUE: { health: +blueHealth, faction: getLongFaction(blueFaction) }
  }
}

const resolveCell = item => {
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
    confused = ''
  ] = item.match(/^(\d+)(\w+)([RB])([1-5])?(P)?(F)?(C)?$/)

  return {
    strength: +strength,
    level: +level,
    card: getRawCardData(id),
    player: player === 'R' ? 'RED' : 'BLUE',
    poisoned: poisoned === 'P',
    frozen: frozen === 'F',
    confused: confused === 'C'
  }
}

const deserialiseBoard = string => {
  // Split resulting string on semi-colons, used as separators between cells
  const cells = string.split(',')

  // If for any reason there are too many or not enough cells for the full grid,
  // remove extra cells or complete it with empty cells
  if (cells.length < 20) {
    const missingCells = Array.from({ length: 20 - cells.length }, _ => '')
    cells.push(...missingCells)
  } else if (cells.length > 20) {
    cells.splice(20, cells.length - 20)
  }

  // Resolve all cells to their actual object
  const resolvedCells = cells.map(resolveCell)

  // Reconstruct a 2-dimensional board from this array
  return chunk(resolvedCells, 4)
}

const deserialiseCards = (string, size) => {
  const cards = string.split(',')

  // If for any reason there are too many or not enough cards,
  // remove extra cards or complete it with empty cards
  if (cards.length < size) {
    const missingcards = Array.from({ length: size - cards.length }, _ => '')
    cards.push(...missingcards)
  } else if (cards.length > size) {
    cards.splice(size, cards.length - size)
  }

  return cards.map(card => {
    if (!card) {
      return { ...DEFAULT_CARD }
    }

    // Use `\d+` instead of `[1-5]` as token cards store their strength as their
    // level since that’s the only variable they have
    const [, level, id] = card.match(/(\d+)(\w+)/)

    return { id, level: +level }
  })
}

const deserialiseSettings = string => {
  const [, mana, gridMarkers] = string.match(/^(\d+)(?:M([01]))?$/)

  return { mana: +mana, gridMarkers: !!+gridMarkers }
}

const deserialiseHand = (handString, cardsString) => {
  // Board was created before it was possible to have a full deck, so the `hand`
  // part of the serialised string is actually undefined instead of being an
  // empty string. In that case, we need to consider the 4 first cards from the
  // deck to be the hand.
  if (handString === undefined) {
    return deserialiseCards(cardsString)
      .filter(card => !!card.id)
      .map(card => card.id)
  }

  return handString
    .split(',')
    .slice(0, 4)
    .filter(Boolean)
}

export const deserialiseBattle = hash => {
  const string = window.atob(decodeURIComponent(hash))
  const [
    board = '',
    players = '',
    settings = '',
    cards = '',
    hand /* Explicitly no fallback here */
  ] = string.split(';')

  return {
    board: deserialiseBoard(board),
    players: deserialisePlayers(players),
    cards: deserialiseCards(cards, 12),
    hand: deserialiseHand(hand, cards),
    ...deserialiseSettings(settings)
  }
}

const resolveMana = value => {
  const chunks = value.split('/')

  if (chunks.length === 1) {
    return {
      values: [null, null, null, null, null].fill(chunks[0]),
      display: chunks[0]
    }
  }

  return { values: chunks, display: value }
}

const resolveStrength = (value, cardType) => {
  const chunks = value.split('/')

  if (cardType === 'spell' || chunks[0] === '') {
    return {
      values: [null, null, null, null, null],
      display: null
    }
  }

  if (chunks.length === 1) {
    return {
      values: [null, null, null, null, null].fill(chunks[0]),
      display: chunks[0]
    }
  }

  return { values: chunks, display: value }
}

export const deserialiseCard = hash => {
  const decodedData = window.atob(hash)
  const chunks = decodedData.split(';')
  const card = {}

  card.faction = getLongFaction(chunks[0])
  card.type = getLongType(chunks[2])
  card.race = card.type === 'unit' ? getLongRace(chunks[1]) : null
  card.rarity = getLongRarity(chunks[3])
  card.mana = resolveMana(chunks[4])
  card.strength = resolveStrength(chunks[6], card.type)
  card.name = decodeURIComponent(chunks[7])

  // If the card is a unit and movement is defined, return it
  card.movement =
    card.type === 'unit' && !isNaN(parseInt(chunks[5]))
      ? Number(chunks[5])
      : null

  // If the serialised image data is the ID of an existing card, set the ID in
  // `imageCardId` key; otherwise set it in `imageURL` key; then and delete
  // image.
  if (getRawCardData(chunks[8]).image) {
    card.imageCardId = chunks[8]
  } else {
    card.imageURL = decodeURIComponent(chunks[8])
  }

  card.ability = resolveAbility(chunks[9])

  // Whether the card has a level defined can act as a legacy check since the
  // multi-level system doesn’t serialise the level
  card.level = Number(chunks[10]) || null

  card.hasSingleLevel =
    card.level &&
    /* Mana */ !chunks[4].includes('/') &&
    /* Strength */ !chunks[6].includes('/') &&
    /* Ability */ !chunks[9].includes('/')

  return card
}

export const deserialiseDeck = hash =>
  window
    .atob(hash)
    .split(',')
    .map(card => {
      if (!card) {
        return null
      }

      // Use `\d+` instead of `[1-5]` as token cards store their strength as
      // their level since that’s the only variable they have
      const [, level, id] = card.match(/(\d+)(\w+)/)

      return { id, level: +level }
    })
    .filter(Boolean)

const QUEST_PROPERTIES = [
  { name: 'name', resolve: value => decodeURIComponent(value) },
  { name: 'amount', resolve: value => +value },
  { name: 'currency', resolve: value => getLongCurrency(value) },
  { name: 'difficulty', resolve: value => +value },
  { name: 'description', resolve: value => decodeURIComponent(value) }
]

export const deserialiseQuest = hash =>
  window
    .atob(hash)
    .split(';')
    .reduce((acc, value, index) => {
      const property = QUEST_PROPERTIES[index]
      acc[property.name] = property.resolve(value)

      return acc
    }, {})

export const deserialiseList = hash =>
  window
    .atob(hash)
    .split(';')
    .map(value => {
      const [name = '', cards = ''] = value.split(',')

      return {
        name: decodeURIComponent(name),
        cards: cards.match(/[NWIFS]\d+/g) || []
      }
    })
