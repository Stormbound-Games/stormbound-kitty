import s from '../../integration/dryRunner/selectors'
import { getCardData } from '../../utils'

const drawHand = ids => {
  Cypress.log({
    name: `DRAW_HAND`,
    message: `Draw cards ${ids
      .map(id => `‘${getCardData(id).name}’ (${id})`)
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
      .should('be.visible')
      .click({ log: false })
  })
}

export default drawHand
