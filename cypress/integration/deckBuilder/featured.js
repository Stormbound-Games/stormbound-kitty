import s from './selectors'

describe('Deck Builder — Featured', () => {
  it('should be possible to bookmark a deck', () => {
    cy.visit('/deck/featured')
      .get(s.DECK_SUGGESTION)
      .first()
      .find(s.BOOKMARK_BTN)
      .click()
      .should('have.attr', 'aria-pressed', 'true')
      .visit('/deck/collection')
      .get(s.PERSONAL_DECKS)
      .should('have.length', 1)
      .saveLocalStorage()
  })

  it('should be possible to unbookmark a deck', () => {
    cy.restoreLocalStorage()
      .visit('/deck/featured')
      .get(s.DECK_SUGGESTION)
      .first()
      .find(s.BOOKMARK_BTN)
      .click()
      .should('have.attr', 'aria-pressed', 'false')
      .visit('/deck/collection')
      .get(s.PERSONAL_DECKS)
      .should('have.length', 0)
  })

  it('should be possible to filter decks', function () {
    cy.visit('/deck/featured')
      .get('[data-testid="page-meta"]')
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
