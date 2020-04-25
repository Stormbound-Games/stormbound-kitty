import s from '../../integration/dryRunner/selectors'

const drawHand = ids => {
  Cypress.log({
    name: `Pick hand`,
    message: `Select card ${ids.join(', ')} as initial hand`,
  })

  ids.forEach(id => {
    cy.get(s.DECK_CARD)
      .filter('[data-testid="' + id + '"]')
      .find('button')
      .first()
      .click()
  })
}

export default drawHand
