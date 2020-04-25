import s from '../../integration/dryRunner/selectors'

const endTurn = () => {
  return cy.get(s.END_TURN_BTN).click()
}

export default endTurn
