import s from '../../integration/dryRunner/selectors'

const play = id => {
  Cypress.log({
    name: `Play ${id}`,
    message: `Play card ${id}`,
  })

  cy.drSelect(id).get(s.PLAY_BTN).click()
}

export default play
