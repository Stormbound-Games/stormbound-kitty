import sortCards from '~/helpers/sortCards'
import CARDS from '~/data/cards'

export default () =>
  CARDS.reduce((acc, card) => {
    const group = card.token ? 'tokens' : card.faction

    if (typeof acc[group] === 'undefined') {
      acc[group] = []
    }

    // For some reasons images get bundled if passed into the react-select
    // render tree
    const copy = { ...card }
    delete copy.image

    acc[group].push(copy)
    acc[group].sort(sortCards())

    return acc
  }, {})
