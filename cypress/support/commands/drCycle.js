import s from '../../integration/dryRunner/selectors'

const cycle = id => {
  Cypress.log({
    name: `Cycle ${id}`,
    message: `Cycle card ${id}`,
  })

  cy.drSelect(id).get(s.CYCLE_BTN).click()
}

export default cycle
