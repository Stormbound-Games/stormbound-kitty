import s from './selectors'

describe('Official card — Collection', () => {
  it('should display progress with a loaded collection', () => {
    cy.visit('/collection')
      .get('[data-testid="import-btn"]')
      .importFile('collection.import.csv')

      .visit('/cards/N1')

      .get('[role="progressbar"]')
      .should('exist')
  })

  it('should display upgradable levels with a loaded collection', () => {
    cy.visit('/collection')
      .get('[data-testid="import-btn"]')
      .importFile('collection.import.csv')

      .visit('/cards/N1')

      .get(s.CARD)
      .eq(2)
      .should('have.attr', 'data-upgradable', 'true')

      .get(s.CARD)
      .eq(3)
      .should('not.have.attr', 'data-upgradable')

      .get(s.CARD)
      .eq(4)
      .should('not.have.attr', 'data-upgradable')
  })
})
