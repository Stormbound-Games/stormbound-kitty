import s from '../../integration/dryRunner/selectors'

const reset = ({ equals = false, modifier = 'NONE' } = {}) => {
  Cypress.log({
    name: 'RESET',
    message: `Reset ${
      equals ? 'in equals mode' : ''
    } with modifier ${modifier}`,
    consoleProps: () => ({ equals, modifier }),
  })

  if (equals) {
    return cy
      .get(s.EQUALS_MODE_CHECKBOX, { log: false })
      .check({ log: false })

      .get(s.EQUALS_DIALOG, { log: false })
      .find(s.RESET_CONFIRM_BTN, { log: false })
      .should('be.visible')
      .click({ log: false })
  }

  if (modifier === 'NONE') {
    return cy
      .get(s.RESET_BTN, { log: false })
      .should('be.visible')
      .click({ log: false })

      .get(s.RESET_DIALOG, { log: false })
      .find(s.RESET_CONFIRM_BTN, { log: false })
      .should('be.visible')
      .click({ log: false })
  }

  return cy
    .get(s.BRAWL_MODIFIER_SELECT, { log: false })
    .should('be.visible')
    .select(modifier, { log: false })

    .get(s.BRAWL_MODIFIER_DIALOG, { log: false })
    .find(s.RESET_CONFIRM_BTN, { log: false })
    .should('be.visible')
    .click({ log: false })
}

export default reset
