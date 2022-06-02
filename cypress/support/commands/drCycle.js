import s from '../../e2e/dryRunner/selectors'

const cycle = id => {
  if (typeof id === 'number') {
    return cy
      .get(s.CARD, { log: false })
      .eq(id, { log: false })
      .then($card => cy.drCycle($card.attr('id')))
  }

  Cypress.log({
    name: 'CYCLE',
    message: `Cycle ${id}`,
    consoleProps: () => ({ id }),
  })

  cy.drSelect(id, { log: false })
    .get(s.CYCLE_BTN, { log: false })
    .should('be.visible')
    .click({ log: false })
}

export default cycle
