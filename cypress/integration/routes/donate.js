describe('Routes — Donate', () => {
  it('it should render', () => {
    cy.visit('/donate').get('main h1').should('exist')
  })
})
