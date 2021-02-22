describe('Routes — Collection', () => {
  it('should render the collection', () => {
    cy.visit('/collection').get('main h1').should('exist')
  })

  it('should render the stats page', () => {
    cy.visit('/collection/stats').get('main h1').should('exist')
  })
})
