describe('Routes — Collection', () => {
  it('it should render', () => {
    cy.visit('/collection').get('main h1').should('exist')
  })
})
