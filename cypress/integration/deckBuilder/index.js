import s from './selectors'

describe('Deck Builder — Index', () => {
  before(() => cy.visit('/deck'))

  it('should be possible to add a card to the deck', () => {
    // Record some aliases.
    cy.get(s.CARD).first().as('card')
    cy.get('@card').prev('button').as('button')
    cy.get('@card').invoke('attr', 'id').as('id')
    cy.get('@card').parent().as('slot')

    // Add the card to the deck.
    cy.get('@button').click()

    // Make sure it worked.
    cy.get('@button').should('be.disabled')
    cy.get('@slot').find(s.IN_DECK).should('exist')
    cy.get('@id').then(id => {
      cy.get(s.DECK_CARD)
        .first()
        .invoke('attr', 'data-testid')
        .should('match', new RegExp(id))
    })
  })

  it('should be possible to remove a card from the deck', () => {
    cy.get(s.DECK_CARD).first().as('deckSlot')
    cy.get('@deckSlot').find('button').click()
    cy.get('@deckSlot').should('have.attr', 'data-testid', 'deck-slot')
  })

  it('should not be possible to add a missing card to the deck', () => {
    cy.get(s.IMPORT_BTN).importFile('collection.import.csv')
    cy.get(s.CARD).first().as('card')
    cy.get('@card').should('have.attr', 'data-missing', 'true')
    cy.get('@card').prev('button').should('be.disabled')
  })
})
