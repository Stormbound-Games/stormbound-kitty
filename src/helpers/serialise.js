import {
  getShortFaction,
  getShortRace,
  getShortRarity,
  getShortType,
  getShortCurrency,
} from './encoding'
import getRawCardData from './getRawCardData'

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

const serialisePlayers = ({ RED, BLUE }) =>
  `R${RED.health}${getShortFaction(RED.faction)}` +
  '-' +
  `B${BLUE.health}${getShortFaction(BLUE.faction)}`

const serialiseSettings = ({ mana, gridMarkers }) =>
  mana + (gridMarkers ? 'M1' : 'M0')

export const serialiseCards = cards =>
  cards
    .filter(card => card && card.id)
    .map(
      card =>
        // Because the serialised cards are joined together without commas,
        // because tokens carry their strength in their level, we need a
        // deterministic approach to deserialise them later on.
        String(card.level).padStart(card.token ? 2 : 1, '0') + card.id
    )
    .join('')

export const serialiseBattle = (board, players, settings, { cards, hand }) =>
  window.btoa(
    [
      serialiseBoard(board),
      serialisePlayers(players),
      serialiseSettings(settings),
      serialiseCards(cards),
      hand.join(','),
    ].join(';')
  )

export const serialiseCard = formState =>
  window.btoa(
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
  )

export const serialiseQuest = formState =>
  window.btoa(
    [
      encodeURIComponent(formState.name),
      formState.amount,
      getShortCurrency(formState.currency),
      formState.difficulty,
      encodeURIComponent(formState.description),
    ].join(';')
  )

export const serialiseDeck = cards => window.btoa(serialiseCards(cards))

export const serialiseCardFromCollection = id =>
  serialiseCard(getRawCardData(id))

export const serialiseList = tiers =>
  window.btoa(
    tiers
      .filter(tier => tier.cards.length > 0)
      .map(tier =>
        [encodeURIComponent(tier.name), tier.cards.join('')].join(',')
      )
      .join(';')
  )
