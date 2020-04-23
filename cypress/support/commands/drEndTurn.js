import s from '../../integration/deckBuilder/selectors'

const endTurn = () => {
  return cy.get(s.DR_END_TURN_BTN).click()
}

export default endTurn
