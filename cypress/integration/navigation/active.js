import s from './selectors'

describe('Navigation — Active', () => {
  before(() => cy.visit('/'))

  it('should have proper active state', () => {
    Array.from({ length: 6 }, (_, i) => {
      cy.get(s.LINK)
        .eq(i)
        .click()
        .get(s.LINK)
        .eq(i)
        .should('have.class', s.ACTIVE.slice(1))
        .get(s.NAV)
        .last()
        .find(s.ACTIVE)
        .should('have.length', 1)
    })
  })
})
