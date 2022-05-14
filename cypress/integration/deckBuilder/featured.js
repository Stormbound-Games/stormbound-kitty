import s from './selectors'

describe('Deck Builder — Featured', () => {
  before(() => cy.clearLocalStorageSnapshot())
  beforeEach(() => cy.restoreLocalStorage())
  afterEach(() => cy.saveLocalStorage())

  it('should be possible to bookmark a deck', () => {
    cy.visit('/decks')
    cy.get(s.DECK_SUGGESTION)
      .first()
      .find(s.BOOKMARK_BTN)
      .click()
      .should('have.attr', 'aria-pressed', 'true')
    cy.visit('/decks/bookmarks')
    cy.get(s.PERSONAL_DECKS).should('have.length', 1)
  })

  it('should be possible to unbookmark a deck', () => {
    cy.visit('/decks')
    cy.get(s.DECK_SUGGESTION)
      .first()
      .find(s.BOOKMARK_BTN)
      .click()
      .should('have.attr', 'aria-pressed', 'false')
    cy.visit('/decks/bookmarks')
    cy.get(s.PERSONAL_DECKS).should('have.length', 0)
  })

  it('should be possible to filter decks', function () {
    cy.visit('/decks').get(s.PAGE_META).invoke('text').as('meta')
    cy.get('[data-testid="filter-author"]').select('arthisroo')
    cy.get(s.PAGE_META)
      .invoke('text')
      .then(text => expect(text).to.not.equal(this.meta))
    cy.get('meta[name="author"]').should('have.attr', 'content', 'ArthisRoo')
    cy.get('[data-testid="filter-name"]').type('sim city')
    cy.get(s.DECK_SUGGESTION).should('have.length', 1)
  })
})
