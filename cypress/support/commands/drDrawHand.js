import s from '../../e2e/dryRunner/selectors'

const drawHand = ids => {
  Cypress.log({
    name: `DRAW_HAND`,
    message: `Draw cards ${ids.join(', ')} as initial hand`,
    consoleProps: () => ({ ids }),
  })

  ids.forEach(id => {
    if (!id.includes('_')) {
      id = id + '_0'
    }

    cy.get(s.DECK_CARD, { log: false })
      .filter('[data-testid*="' + id + '"]', { log: false })
      .find('button', { log: false })
      .first({ log: false })
      .should('be.visible')
      .click({ log: false })
  })
}

export default drawHand
