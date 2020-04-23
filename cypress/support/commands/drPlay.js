import s from '../../integration/deckBuilder/selectors'

const play = id => {
  Cypress.log({
    name: `Play ${id}`,
    message: `Play card ${id}`,
  })

  cy.drSelect(id).get(s.DR_PLAY_BTN).click()
}

export default play
