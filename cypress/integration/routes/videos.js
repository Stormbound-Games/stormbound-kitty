describe('Routes — Videos', () => {
  it('it should render the videos page', () => {
    cy.visit('/videos').get('main h1').should('exist')
  })
})
