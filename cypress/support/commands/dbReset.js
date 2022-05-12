import s from '../../integration/deckBuilder/selectors'

const reset = () => {
  Cypress.log({
    name: 'RESET',
    message: 'Reset deck',
  })

  return cy
    .get(s.RESET_BTN, { log: false })
    .should('be.visible')
    .click({ log: false })

    .get(s.RESET_CONFIRM_BTN, { log: false })
    .should('be.visible')
    .click({ log: false })
}

export default reset
