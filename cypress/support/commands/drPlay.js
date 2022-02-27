import s from '../../integration/dryRunner/selectors'
import cardsIndex from '../../fixtures/cards'

const play = id => {
  if (typeof id === 'number') {
    return cy
      .get(s.CARD, { log: false })
      .eq(id, { log: false })
      .then($card => cy.drPlay($card.attr('id')))
  }

  const { name } = cardsIndex[id]

  Cypress.log({
    name: 'PLAY',
    message: `Play ‘${name}’ (${id})`,
    consoleProps: () => ({ id, name }),
  })

  cy.drSelect(id, { log: false })
    .get(s.PLAY_BTN, { log: false })
    .click({ log: false })
}

export default play
