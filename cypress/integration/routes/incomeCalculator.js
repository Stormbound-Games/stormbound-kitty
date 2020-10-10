describe('Routes — Income Calculator', () => {
  it('it should render', () => {
    cy.visit('/calculators/income').get('main h1').should('exist')
  })
})
