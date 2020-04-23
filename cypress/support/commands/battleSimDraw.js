import s from '../../integration/battleSim/selectors'

export default ({ card, level, slot = 1 }) => {
  Cypress.log({
    name: 'Draw ' + slot,
    message: [card, level].filter(Boolean).join(' '),
  })

  cy.get(s['CARDS_FORM_SELECT_' + slot])
    .click({ force: true })
    .type(card, { force: true })
    .type('{enter}', { force: true })

    .then(() => {
      if (level) {
        return cy.get(s['CARDS_FORM_LEVEL_' + slot]).select(String(level))
      }
    })
}
