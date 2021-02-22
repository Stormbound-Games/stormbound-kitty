describe('Routes — About', () => {
  it('should render', () => {
    cy.visit('/about').get('main h1').should('exist')
  })
})
