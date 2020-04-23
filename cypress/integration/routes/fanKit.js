describe('Routes — Fan-Kit', () => {
  it('it should render', () => {
    cy.visit('/fan-kit').get('main h1').should('exist')
  })
})
