describe('Routes — Videos', () => {
  it('should render the videos page', () => {
    cy.visit('/videos').get('main h1').should('exist')
  })
})
