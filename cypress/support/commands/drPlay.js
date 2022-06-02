import s from '../../e2e/dryRunner/selectors'

const play = id => {
  if (typeof id === 'number') {
    return cy
      .get(s.CARD, { log: false })
      .eq(id, { log: false })
      .then($card => cy.drPlay($card.attr('id')))
  }

  Cypress.log({
    name: 'PLAY',
    message: `Play ${id}`,
    consoleProps: () => ({ id }),
  })

  cy.drSelect(id, { log: false })
    .get(s.PLAY_BTN, { log: false })
    .should('be.visible')
    .click({ log: false })
}

export default play
