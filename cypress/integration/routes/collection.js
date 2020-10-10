describe('Routes — Collection', () => {
  it('it should render the collection', () => {
    cy.visit('/collection').get('main h1').should('exist')
  })

  it('it should render the stats page', () => {
    cy.visit('/collection/stats').get('main h1').should('exist')
  })

  it('it should render the books page', () => {
    cy.visit('/calculators/books').get('main h1').should('exist')
  })
})
