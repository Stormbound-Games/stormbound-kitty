import s from '../../integration/deckBuilder/selectors'

const reset = () => {
  Cypress.log({
    name: 'RESET',
    message: 'Reset deck',
  })

  return cy
    .get(s.RESET_BTN)
    .click()

    .get(s.RESET_CONFIRM_BTN)
    .click()
}

export default reset
