describe('Routes — Changelog', () => {
  it('it should render', () => {
    cy.visit('/changelog').get('main h1').should('exist')
  })
})
