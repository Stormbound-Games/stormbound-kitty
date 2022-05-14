import s from './selectors'

describe('Battle Simulator — Zoom', () => {
  before(() => {
    cy.visit('/simulators/battle')
    cy.bsFill('A1', { card: 'Zhev' })
    cy.bsDraw({ slot: 1, card: 'Zhev' })
  })

  it('should be possible to zoom a card in hand', () => {
    cy.get(s.CARD_SLOT_1).find(s.CARD_SLOT_BUTTON).click()
    cy.get(s.ZOOM).should('be.visible').click()
  })

  it('should not be possible to zoom a cell', () => {
    cy.get(s.CELL_A1).click()
    cy.get(s.ZOOM).should('not.exist')
  })
})
