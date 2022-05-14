import s from './selectors'

describe('Battle Simulator — Grid Markers', () => {
  before(() => {
    cy.visit('/simulators/battle')
  })

  it('should be possible to enable grid markers', () => {
    cy.get(s.GRID_MARKERS_CHECKBOX).click()
    cy.get(s.GRID_MARKERS).should('exist')
    cy.url().should('not.match', /battle$/)
  })

  it('should be preserved upon reload', () => {
    cy.reload()
    cy.get(s.GRID_MARKERS).should('exist')
  })

  it('should be possible to enable and disable grid markers', () => {
    cy.get(s.GRID_MARKERS_CHECKBOX).click()
    cy.get(s.GRID_MARKERS).should('not.exist')
  })
})
