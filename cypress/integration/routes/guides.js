describe('Routes — Guides', () => {
  it('it should render the index', () => {
    cy.visit('/guides').get('h1').should('be.visible')
  })

  it('it should render the Winter guide', () => {
    cy.visit('/guides/winter').get('main h1').should('exist')
  })

  it('it should render the Complete guide', () => {
    cy.visit('/guides/complete').get('main h1').should('exist')
  })

  it('it should render the Pirate guide', () => {
    cy.visit('/guides/pirate').get('main h1').should('exist')
  })

  it('it should render the Deck Building guide', () => {
    cy.visit('/guides/deck').get('main h1').should('exist')
  })

  it('it should render the lexicon', () => {
    cy.visit('/guides/lexicon').get('main h1').should('exist')
  })

  it('it should render the drawing guide', () => {
    cy.visit('/guides/drawing').get('main h1').should('exist')
  })

  it('it should render the resources guide', () => {
    cy.visit('/guides/resources').get('main h1').should('exist')
  })
})
