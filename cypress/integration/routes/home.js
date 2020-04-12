describe('Routes — Home', () => {
  it('it should render', () => {
    cy.visit('/').get('main h1').should('exist')
  })
})
