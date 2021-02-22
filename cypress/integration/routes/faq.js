describe('Routes — FAQ', () => {
  it('should render', () => {
    cy.visit('/faq').get('main h1').should('exist')
  })
})
