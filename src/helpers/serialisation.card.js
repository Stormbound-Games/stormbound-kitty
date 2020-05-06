import getRawCardData from './getRawCardData'
import resolveAbility from './resolveAbility'
import {
  getLongFaction,
  getLongRace,
  getLongRarity,
  getLongType,
} from './encoding'
import {
  getShortFaction,
  getShortRace,
  getShortRarity,
  getShortType,
} from './encoding'

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

export const deserialiseCard = string => {
  const chunks = string.split(';')
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
      ? parseInt(chunks[5])
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

  card.elder = (chunks[11] || '').includes('E')
  card.hero = (chunks[11] || '').includes('H')

  return card
}

const serialiseCard = formState =>
  [
    getShortFaction(formState.faction),
    getShortRace(formState.race),
    getShortType(formState.type),
    getShortRarity(formState.rarity),
    formState.mana,
    formState.movement,
    formState.strength,
    encodeURIComponent(formState.name),
    formState.id ||
      formState.imageCardId ||
      encodeURIComponent(formState.imageURL || ''),
    encodeURIComponent(formState.ability || ''),
    formState.level,
    (formState.elder ? 'E' : '') + (formState.hero ? 'H' : ''),
  ].join(';')

export default {
  serialise: card => window.btoa(serialiseCard(card)),
  deserialise: hash => deserialiseCard(window.atob(hash)),
}
