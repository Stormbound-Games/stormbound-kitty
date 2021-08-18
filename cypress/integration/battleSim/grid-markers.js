import s from './selectors'

describe('Battle Sim — Grid Markers', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should be possible to enable and disable grid markers', () => {
    cy.get(s.GRID_MARKERS_CHECKBOX)
      .click()
      .get(s.GRID_MARKERS)
      .should('exist')
      .get(s.GRID_MARKERS_CHECKBOX)
      .click()
      .get(s.GRID_MARKERS)
      .should('not.exist')
  })

  it('should be preserved upon reload', () => {
    cy.wait(3000)
      .reload()
      .get(s.GRID_MARKERS)
      .should('not.exist')
      .get(s.GRID_MARKERS_CHECKBOX)
      .click()
      .reload()
      .get(s.GRID_MARKERS)
      .should('exist')
  })
})
