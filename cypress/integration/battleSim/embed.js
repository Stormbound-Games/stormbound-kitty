describe('Battle Simulator — Embed', () => {
  it('should not redirect to the battle sim', () => {
    cy.visit('/guides/reckless-rush')
    cy.wait(3000)
    cy.url().should('match', /\/guides\/reckless\-rush$/)
  })
})
