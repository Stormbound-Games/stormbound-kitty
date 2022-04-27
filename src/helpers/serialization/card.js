import resolveAbility from '~/helpers/resolveAbility'
import {
  getLongFaction,
  getLongUnitType,
  getLongRarity,
  getLongType,
  getShortFaction,
  getShortUnitType,
  getShortRarity,
  getShortType,
} from '~/helpers/encoding'
import { base64Decode, base64Encode } from '~/helpers/base64'

const resolveMana = value => {
  const chunks = value.split('/')

  if (chunks.length === 1) {
    return {
      values: [null, null, null, null, null].fill(chunks[0]),
      display: chunks[0],
    }
  }

  return { values: chunks, display: value }
}

const resolveStrength = (value, cardType) => {
  const chunks = value.split('/')

  if (cardType === 'spell' || chunks[0] === '') {
    return {
      values: [null, null, null, null, null],
      display: null,
    }
  }

  if (chunks.length === 1) {
    return {
      values: [null, null, null, null, null].fill(chunks[0]),
      display: chunks[0],
    }
  }

  return { values: chunks, display: value }
}

export const deserializeCard = (cardsIndex, string) => {
  const chunks = string.split(';')
  const card = {}

  card.faction = getLongFaction(chunks[0])
  card.type = getLongType(chunks[2])
  card.rarity = getLongRarity(chunks[3])
  card.mana = resolveMana(chunks[4])
  card.strength = resolveStrength(chunks[6], card.type)
  card.name = decodeURIComponent(chunks[7])

  // If the card is a unit and movement is defined, return it
  if (card.type === 'unit' && chunks[5]) {
    const value = parseInt(chunks[5], 10)
    card.movement = isNaN(value) ? null : value
    card.fixedMovement = chunks[5].endsWith('F')
  } else {
    card.movement = null
    card.fixedMovement = false
  }

  // If the serialized image data is the ID of an existing card, set the ID in
  // `imageCardId` key; otherwise set it in `imageURL` key; then and delete
  // image.
  if (chunks[8] in cardsIndex) {
    card.imageCardId = chunks[8]
  } else {
    card.imageURL = decodeURIComponent(chunks[8])
  }

  card.ability = resolveAbility(decodeURIComponent(chunks[9]))

  // Whether the card has a level defined can act as a legacy check since the
  // multi-level system doesn’t serialize the level
  card.level = Number(chunks[10]) || null

  card.hasSingleLevel =
    card.level &&
    /* Mana */ !chunks[4].includes('/') &&
    /* Strength */ !chunks[6].includes('/') &&
    /* Ability */ !chunks[9].includes('/')

  // If the race is a single character long,
  card.unitTypes = [
    ...chunks[1].split(',').map(getLongUnitType),
    // Ancient, Elder and Hero used to be treated differently than other unit
    // types and stored in the 12th slot (index 11).
    (chunks[11] || '').includes('A') && 'ancient',
    (chunks[11] || '').includes('E') && 'elder',
    (chunks[11] || '').includes('H') && 'hero',
  ].filter(Boolean)

  return card
}

const serializeCard = formState =>
  [
    getShortFaction(formState.faction),
    // Unit types need to be comma-separated because they could be either a
    // short unit type (e.g. `A` for “Ancient”) or a custom unit type (e.g.
    // “Butterfly”)
    formState.unitTypes.map(getShortUnitType).join(','),
    getShortType(formState.type),
    getShortRarity(formState.rarity),
    formState.mana,
    formState.movement + (formState.fixedMovement ? 'F' : ''),
    formState.strength,
    encodeURIComponent(formState.name),
    formState.id ||
      formState.imageCardId ||
      encodeURIComponent(formState.imageURL || ''),
    encodeURIComponent(formState.ability || ''),
    formState.level,
    '', // Former unit type modifiers
  ].join(';')

const card = {
  serialize: card => base64Encode(serializeCard(card)),
  deserialize: (cardsIndex, hash) =>
    deserializeCard(cardsIndex, base64Decode(hash)),
}

export default card
