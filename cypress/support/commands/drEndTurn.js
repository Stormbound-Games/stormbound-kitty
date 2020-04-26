import s from '../../integration/dryRunner/selectors'

const endTurn = (count = 1) => {
  Cypress.log({
    name: `END_TURN`,
    message: `Ending ${count} turn${count === 1 ? '' : 's'}`,
  })

  for (let i = 0; i < count; i++) {
    cy.get(s.END_TURN_BTN, { log: false }).click({ log: false })
  }
}

export default endTurn
