describe('Routes — Members', () => {
  it('it should render the members page', () => {
    cy.visit('/members').get('main h1').should('exist')
  })
})
