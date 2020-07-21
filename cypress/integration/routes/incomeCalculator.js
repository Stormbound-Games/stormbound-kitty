describe('Routes — Income Calculator', () => {
  it('it should render', () => {
    cy.visit('/income-calculator').get('main h1').should('exist')
  })
})
