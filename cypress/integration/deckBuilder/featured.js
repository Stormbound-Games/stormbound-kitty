import s from './selectors'

describe('Deck Builder — Featured', () => {
  before(() => cy.clearLocalStorageSnapshot())
  beforeEach(() => cy.restoreLocalStorage())
  afterEach(() => cy.saveLocalStorage())

  it('should be possible to bookmark a deck', () => {
    cy.visit('/decks')

      .get(s.DECK_SUGGESTION)
      .first()
      .find(s.BOOKMARK_BTN)
      .click()
      .should('have.attr', 'aria-pressed', 'true')

    cy.getLocalStorage('sk.personal_decks').should('not.eq', null)

    // Using `.visit()` doesn’t work as the local storage appears to be lost.
    cy.get('a[href="/decks/bookmarks"]')
      .last()
      .click()
      .url()
      .should('match', /bookmarks$/)

      .get(s.PERSONAL_DECKS)
      .should('have.length', 1)
  })

  it('should be possible to unbookmark a deck', () => {
    cy.getLocalStorage('sk.personal_decks').should('not.eq', null)

    cy.visit('/decks')
      .get(s.DECK_SUGGESTION)
      .first()
      .find(s.BOOKMARK_BTN)
      .click()
      .should('have.attr', 'aria-pressed', 'false')
      // Using `.visit()` doesn’t work as the local storage appears to be lost.
      .get('a[href="/decks/bookmarks"]')
      .last()
      .click()
      .get(s.PERSONAL_DECKS)
      .should('have.length', 0)
  })

  it('should be possible to filter decks', function () {
    cy.get('[data-testid="page-meta"]')
      .invoke('text')
      .as('meta')

      .get('[data-testid="filter-author"]')
      .select('arthisroo')

      .get('[data-testid="page-meta"]')
      .invoke('text')
      .then(text => expect(text).to.not.equal(this.meta))

      .get('meta[name="author"]')
      .should('have.attr', 'content', 'ArthisRoo')

      .get('[data-testid="filter-name"]')
      .type('sim city')

      .get(s.DECK_SUGGESTION)
      .should('have.length', 1)
  })
})
