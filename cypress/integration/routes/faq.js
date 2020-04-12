describe('Routes — FAQ', () => {
  it('it should render', () => {
    cy.visit('/faq').get('main h1').should('exist')
  })
})
