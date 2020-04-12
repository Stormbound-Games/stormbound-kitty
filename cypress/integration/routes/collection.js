describe('Routes — Collection', () => {
  it('it should render', () => {
    cy.visit('/deck/collection').get('main h1').should('exist')
  })
})
