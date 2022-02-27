import s from '../../integration/dryRunner/selectors'
import cardsIndex from '../../fixtures/cards'

const drawHand = ids => {
  Cypress.log({
    name: `DRAW_HAND`,
    message: `Draw cards ${ids
      .map(id => `‘${cardsIndex[id].name}’ (${id})`)
      .join(', ')} as initial hand`,
    consoleProps: () => ({ ids }),
  })

  ids.forEach(id => {
    if (!id.includes('_')) {
      id = id + '_0'
    }
    cy.get(s.DECK_CARD, { log: false })
      .filter('[data-testid*="' + id + '"]', { log: false })
      .find('button', { log: false })
      .first({ log: false })
      .click({ log: false })
  })
}

export default drawHand
