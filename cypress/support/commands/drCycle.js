import s from '../../integration/dryRunner/selectors'
import getRawCardData from '../../../src/helpers/getRawCardData'

const cycle = id => {
  const { name } = getRawCardData(id)

  Cypress.log({
    name: `CYCLE`,
    message: `Cycle ‘${name}’ ${id}`,
  })

  cy.drSelect(id, { log: false })
    .get(s.CYCLE_BTN, { log: false })
    .click({ log: false })
}

export default cycle
