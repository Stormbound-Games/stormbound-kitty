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

  it('should not be possible to zoom an empty cell', () => {
    cy.get(s.CELL_B1).click()
    cy.get(s.ZOOM).should('not.exist')
    cy.get('#cell-form-dialog [data-testid="cell-form-dialog-close"]').click()
  })

  it('should not be possible to zoom a filled cell in editor mode', () => {
    cy.get(s.CELL_A1).should('be.visible').click()
    cy.get(s.ZOOM).should('not.exist')
  })

  it('should be possible to zoom a filled cell in display mode', () => {
    cy.get('[data-testid="page-meta-action"]').click({ force: true })
    cy.get(s.CELL_A1).click()
    cy.get(s.ZOOM).should('be.visible').click()
  })
})
