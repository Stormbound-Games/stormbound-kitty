import s from '../../integration/battleSim/selectors'

export default ({ card, level, slot = 1 }) => {
  Cypress.log({
    name: 'DRAW',
    message: `Drawing ${card}`,
    consoleProps: () => ({ card, level }),
  })

  cy.get(s['CARDS_FORM_SELECT_' + slot], { log: false })
    .click({ force: true, log: false })
    .type(card, { force: true, log: false })
    .type('{enter}', { force: true, log: false })

    .then(() => {
      if (level) {
        return cy
          .get(s['CARDS_FORM_LEVEL_' + slot], { log: false })
          .select(String(level), { log: false })
      }
    })
}
