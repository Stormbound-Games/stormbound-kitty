describe('Battle Simulator — Embed', () => {
  it('should not redirect to the battle sim', () => {
    cy.visit('/guides/complete')
      .wait(3000)
      .url()
      .should('match', /\/guides\/complete$/)
  })
})
