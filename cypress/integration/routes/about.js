describe('Routes — About', () => {
  it('it should render', () => {
    cy.visit('/about').get('main h1').should('exist')
  })
})
