import DECKS from '../../../src/data/decks'

describe('Routes — Deck Builder', () => {
  const deck = DECKS[0]

  it('should render', () => {
    cy.visit('/deck').get('main h1').should('exist')
  })

  it('should render deck editor for ' + deck.id, () => {
    cy.visit('/deck/' + deck.id)
      .get('main h1')
      .should('exist')
  })

  it('should render deck details for ' + deck.id, () => {
    cy.visit('/deck/' + deck.id + '/details')
      .get('main h1')
      .should('exist')
  })

  it('should render deck tracker for ' + deck.id, () => {
    cy.visit('/deck/' + deck.id + '/tracker')
      .get('main h1')
      .should('exist')
  })

  it('should render deck dry-runner for ' + deck.id, () => {
    cy.visit('/deck/' + deck.id + '/dry-run')
      .get('main h1')
      .should('exist')
  })

  it('should render the ready decks', () => {
    cy.visit('/deck/suggestions').get('main h1').should('exist')
  })

  it('should render the personal decks', () => {
    cy.visit('/deck/collection').get('main h1').should('exist')
  })
})
