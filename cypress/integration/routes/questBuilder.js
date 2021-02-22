describe('Routes — Quest Builder', () => {
  it('should render the form', () => {
    cy.visit('/quest').get('main h1').should('exist')
  })

  it('should render a quest', () => {
    cy.visit('/quest/SGk7MTA7UjsyO2doamlrb2w=').get('main h1').should('exist')
  })
})
