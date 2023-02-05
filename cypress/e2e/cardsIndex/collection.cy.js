import s from './selectors'

describe('Cards Index — Collection', () => {
  before(() => cy.clearLocalStorageSnapshot())
  beforeEach(() => cy.restoreLocalStorage())
  afterEach(() => cy.saveLocalStorage())

  it('should display progress with a loaded collection', () => {
    cy.visit('/collection')
    cy.get('[data-testid="import-btn"]').importFile('collection.import.csv')
    cy.visit('/cards/N1')
    cy.get('[role="progressbar"]').should('exist')
    cy.get(s.CARD).eq(2).should('have.attr', 'data-upgradable', 'true')
    cy.get(s.CARD).eq(3).should('not.have.attr', 'data-upgradable')
    cy.get(s.CARD).eq(4).should('not.have.attr', 'data-upgradable')
  })
})
