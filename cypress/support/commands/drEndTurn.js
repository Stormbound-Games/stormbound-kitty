import s from '../../integration/dryRunner/selectors'

const endTurn = (count = 1) => {
  for (let i = 0; i < count; i++) {
    cy.get(s.END_TURN_BTN).click()
  }
}

export default endTurn
