describe('Routes — Changelog', () => {
  it('it should render', () => {
    cy.visit('/changelog').get('main h1').should('exist')
  })

  it('it should render July 2020 update', () => {
    cy.visit('/changelog/07-2020').get('main h1').should('exist')
  })
})
