import s from './selectors'

describe('Battle Sim — Front lines', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should have initial front lines', () => {
    cy.get(s.ROWS)
      .eq(0)
      .should('have.class', 'BSRow--RED-0')
      .get(s.ROWS)
      .eq(4)
      .should('have.class', 'BSRow--BLUE-4')
  })

  it('should move RED front line with units', () => {
    cy.fill('B1', { card: 'Zhev', player: 'RED' })
      .get(s.ROWS)
      .eq(0)
      .should('have.class', 'BSRow--RED-1')
  })

  it('should move BLUE front line with units', () => {
    cy.fill('C1', { card: 'Zhev', player: 'BLUE' })
      .get(s.ROWS)
      .eq(4)
      .should('have.class', 'BSRow--BLUE-2')
  })

  it('should prevent RED front line from going in BLUE base', () => {
    cy.fill('E1', { card: 'Zhev', player: 'RED' })
      .get(s.ROWS)
      .eq(0)
      .should('have.class', 'BSRow--RED-3')
  })

  it('should prevent BLUE front line from going in RED base', () => {
    cy.fill('A1', { card: 'Zhev', player: 'BLUE' })
      .get(s.ROWS)
      .eq(4)
      .should('have.class', 'BSRow--BLUE-1')
  })

  it('should be preserved upon reload', () => {
    cy.reload()
      .get(s.ROWS)
      .eq(4)
      .should('have.class', 'BSRow--BLUE-1')
      .get(s.ROWS)
      .eq(0)
      .should('have.class', 'BSRow--RED-3')
  })
})
