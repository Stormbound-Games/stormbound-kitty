import s from '../../integration/deckBuilder/selectors'

const cycle = id => {
  Cypress.log({
    name: `Cycle ${id}`,
    message: `Cycle card ${id}`,
  })

  cy.drSelect(id).get(s.DR_CYCLE_BTN).click()
}

export default cycle
