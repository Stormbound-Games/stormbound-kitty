import s from './selectors'

describe('Zoom', () => {
  before(() => {
    cy.visit('/sim')
      .fill('A1', { card: 'Zhev' })
      .draw({ slot: 1, card: 'Zhev' })
  })

  it('should be possible to zoom a card in hand', () => {
    cy.get(s.CARD_SLOT_1)
      .find(s.CARD_SLOT_BUTTON)
      .click()
      .get(s.ZOOM)
      .should('be.visible')
      .click()
  })

  it('should not be possible to zoom a cell', () => {
    cy.get(s.CELL_A1).click().get(s.ZOOM).should('not.exist')
  })
})
