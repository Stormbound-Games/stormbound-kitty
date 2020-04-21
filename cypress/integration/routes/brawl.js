describe('Routes — Brawl', () => {
  it('it should render', () => {
    cy.visit('/brawl').get('main h1').should('exist')
  })
})
