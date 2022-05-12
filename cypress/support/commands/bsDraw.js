import s from '../../integration/battleSim/selectors'

const bsDraw = ({ card, level, slot = 1 }) => {
  Cypress.log({
    name: 'DRAW',
    message: `Drawing ${card}`,
    consoleProps: () => ({ card, level }),
  })

  cy.get(s['CARDS_FORM_SELECT_' + slot], { log: false })
    .should('be.visible')
    .click({ force: true, log: false })
    .type(card, { force: true, log: false })
    .type('{enter}', { force: true, log: false })

  if (level) {
    cy.get(s['CARDS_FORM_LEVEL_' + slot], { log: false })
      .should('be.visible')
      .select(String(level), { log: false })
  }
}

export default bsDraw
