import s from './selectors'

describe('Navigation — Active', () => {
  before(() => cy.visit('/'))

  it('should have proper active state', () => {
    Array.from({ length: 8 }, (_, i) => {
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

  it('should have have a proper collapsible menu on mobile', () => {
    cy.viewport('iphone-5')
      .get(s.NAV)
      .should('not.be.visible')
      .get('[aria-controls="navigation-target"]')
      .should('be.visible')
      .click()
      .get(s.NAV)
      .should('be.visible')
      .get(s.LINK)
      .first()
      .click()
      .get(s.NAV)
      .should('not.be.visible')
  })
})
