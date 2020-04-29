import s from '../../integration/dryRunner/selectors'

const reset = ({ equals = false, modifier = 'NONE' }) => {
  Cypress.log({
    name: `RESET`,
    message: `Reset ${
      equals ? 'in equals mode' : ''
    } with modifier ${modifier}`,
  })

  if (equals) {
    return cy
      .get(s.EQUALS_MODE_CHECKBOX)
      .check()

      .get(s.EQUALS_DIALOG)
      .find(s.RESET_CONFIRM_BTN)
      .click()
  }

  if (modifier === 'NONE') {
    return cy
      .get(s.RESET_BTN)
      .click()

      .get(s.RESET_DIALOG)
      .find(s.RESET_CONFIRM_BTN)
      .click()
  }

  return cy
    .get(s.BRAWL_MODIFIER_SELECT)
    .select(modifier)

    .get(s.BRAWL_MODIFIER_DIALOG)
    .find(s.RESET_CONFIRM_BTN)
    .click()
}

export default reset
