import s from './selectors'

describe('Battle Sim — Front lines', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should have initial front lines', () => {
    cy.get(s.ROWS)
      .eq(0)
      .should('have.attr', 'data-battle-sim-row', 'RED-0')
      .get(s.ROWS)
      .eq(4)
      .should('have.attr', 'data-battle-sim-row', 'BLUE-4')
  })

  it('should move RED front line with units', () => {
    cy.bsFill('B1', { card: 'Zhev', player: 'RED' })
      .get(s.ROWS)
      .eq(0)
      .should('have.attr', 'data-battle-sim-row', 'RED-1')
  })

  it('should move BLUE front line with units', () => {
    cy.bsFill('C1', { card: 'Zhev', player: 'BLUE' })
      .get(s.ROWS)
      .eq(4)
      .should('have.attr', 'data-battle-sim-row', 'BLUE-2')
  })

  it('should prevent RED front line from going in BLUE base', () => {
    cy.bsFill('E1', { card: 'Zhev', player: 'RED' })
      .get(s.ROWS)
      .eq(0)
      .should('have.attr', 'data-battle-sim-row', 'RED-3')
  })

  it('should prevent BLUE front line from going in RED base', () => {
    cy.bsFill('A1', { card: 'Zhev', player: 'BLUE' })
      .get(s.ROWS)
      .eq(4)
      .should('have.attr', 'data-battle-sim-row', 'BLUE-1')
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/sim$/)
      .reload()
      .get(s.ROWS)
      .eq(4)
      .should('have.attr', 'data-battle-sim-row', 'BLUE-1')
      .get(s.ROWS)
      .eq(0)
      .should('have.attr', 'data-battle-sim-row', 'RED-3')
  })
})
