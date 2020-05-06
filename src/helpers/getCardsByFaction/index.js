import sortCards from '../sortCards'
import cards from '../../data/cards'

export default () =>
  cards.reduce((acc, card) => {
    if (typeof acc[card.faction] === 'undefined') {
      acc[card.faction] = []
    }

    // For some reasons images get bundled if passed into the react-select
    // render tree
    const copy = { ...card }
    delete copy.image

    acc[card.faction].push(copy)
    acc[card.faction].sort(sortCards())

    return acc
  }, {})
