import s from '../../integration/dryRunner/selectors'
import { getCardData } from '../../utils'

const cycle = id => {
  if (typeof id === 'number') {
    return cy
      .get(s.CARD, { log: false })
      .eq(id, { log: false })
      .then($card => cy.drCycle($card.attr('id')))
  }

  const { name } = getCardData(id)

  Cypress.log({
    name: 'CYCLE',
    message: `Cycle ‘${name}’ ${id}`,
    consoleProps: () => ({ id, name }),
  })

  cy.drSelect(id, { log: false })
    .get(s.CYCLE_BTN, { log: false })
    .click({ log: false })
}

export default cycle
