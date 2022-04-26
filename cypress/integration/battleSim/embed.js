describe('Battle Simulator — Embed', () => {
  it('should not redirect to the battle sim', () => {
    cy.visit('/guides/reckless-rush')
      .wait(3000)
      .url()
      .should('match', /\/guides\/reckless\-rush$/)
  })
})
