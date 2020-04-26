import s from '../../integration/dryRunner/selectors'
import getRawCardData from '../../../src/helpers/getRawCardData'

const select = (id, { log = true } = {}) => {
  if (typeof id === 'number') {
    return cy
      .get(s.CARD, { log: false })
      .eq(id, { log: false })
      .then($card => select($card.attr('id')))
  }

  const { name } = getRawCardData(id)

  if (log) {
    Cypress.log({
      name: `SELECT`,
      message: `Select ‘${name}’ (${id})`,
    })
  }

  return cy
    .get(s.CARD, { log: false })
    .filter('#' + id, { log: false })
    .as('card')
    .prev('button', { log: false })
    .click({ log: false })
}

export default select
